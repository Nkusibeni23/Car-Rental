"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchNotificationPreferences,
  updateNotificationPreferences,
} from "@/store/slices/notificationPreferencesSlice";
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useToast } from "@/app/shared/ToastProvider";

type NotificationPreferencess = {
  title: string;
  description: string;
  enabled: boolean;
  channels: { email: boolean; push: boolean; sms: boolean };
};

type NotificationForm = {
  preferences: NotificationPreferencess[];
};

export default function NotificationSettings() {
  const dispatch = useAppDispatch();
  const { notificationPreferences } = useAppSelector(
    (state) => state.notificationPreferences
  );
  const { user } = useAppSelector((state) => state.auth);
  const { success, error } = useToast();

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { isDirty, isSubmitting },
  } = useForm<NotificationForm>({
    defaultValues: {
      preferences: [],
    },
  });

  // Fetch notification preferences on mount
  useEffect(() => {
    if (user) {
      dispatch(fetchNotificationPreferences(user.id));
    }
  }, [dispatch, user]);

  // Reset form when preferences are loaded
  useEffect(() => {
    if (notificationPreferences?.preferences) {
      reset({
        preferences: notificationPreferences.preferences,
      });
    }
  }, [notificationPreferences, reset]);

  const onSubmit = async (data: NotificationForm) => {
    try {
      dispatch(updateNotificationPreferences(data));
      reset(data);
      success(
        "Preferences Saved",
        "Your notification preferences have been updated successfully."
      );
    } catch (err) {
      const errorMessage =
        (err as Error)?.message ||
        "Failed to save preferences. Please try again.";
      error("Save Failed", errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">
          Email Notifications
        </h3>
        <div className="space-y-4">
          {notificationPreferences?.preferences.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border border-gray-200 rounded-lg space-y-2 sm:space-y-0"
            >
              <div className="flex-1">
                <p className="font-medium text-gray-900">{item.title}</p>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
              <Controller
                name={`preferences.${index}.enabled`}
                control={control}
                render={({ field }) => (
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      field.onChange(checked);

                      // also update channels
                      const updatedChannels = {
                        sms: checked,
                        push: checked,
                        email: checked,
                      };

                      setValue(
                        `preferences.${index}.channels`,
                        updatedChannels,
                        {
                          shouldDirty: true,
                        }
                      );
                    }}
                    className="w-4 h-4 text-black bg-white border border-gray-300 rounded cursor-pointer transition-all duration-200 ease-in-out focus:ring-1 focus:ring-black focus:ring-offset-1 hover:border-gray-400 checked:bg-black checked:border-black checked:text-white accent-black"
                  />
                )}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
        <button
          type="submit"
          disabled={!isDirty || isSubmitting}
          className="flex items-center space-x-2 px-4 md:px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <span className="text-sm md:text-base">
            {isSubmitting ? "Saving..." : "Save Changes"}
          </span>
        </button>
      </div>
    </form>
  );
}
