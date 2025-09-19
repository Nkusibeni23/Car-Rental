"use client";

import { useState } from "react";
import {
  CreditCard,
  Plus,
  Trash2,
  Edit3,
  Check,
  Smartphone,
  Building,
} from "lucide-react";

interface PaymentMethod {
  id: string;
  type: "card" | "bank" | "momo";
  name: string;
  details: string;
  isDefault: boolean;
  lastUsed?: string;
}

export default function PaymentSettings() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "1",
      type: "card",
      name: "Visa ending in 4242",
      details: "•••• •••• •••• 4242 • Expires 12/25",
      isDefault: true,
      lastUsed: "2 days ago",
    },
    {
      id: "2",
      type: "momo",
      name: "MTN Mobile Money",
      details: "+250 •••• ••• 789",
      isDefault: false,
      lastUsed: "1 week ago",
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newMethodType, setNewMethodType] = useState<"card" | "bank" | "momo">(
    "card"
  );

  const setDefaultPayment = (id: string) => {
    setPaymentMethods((methods) =>
      methods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      }))
    );
  };

  const removePaymentMethod = (id: string) => {
    setPaymentMethods((methods) =>
      methods.filter((method) => method.id !== id)
    );
  };

  const getMethodIcon = (type: string) => {
    switch (type) {
      case "card":
        return <CreditCard className="w-5 h-5 text-gray-600" />;
      case "bank":
        return <Building className="w-5 h-5 text-gray-600" />;
      case "momo":
        return <Smartphone className="w-5 h-5 text-gray-600" />;
      default:
        return <CreditCard className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Payment Methods
        </h3>
        <p className="text-sm text-gray-600">
          Manage your payment methods for car rentals
        </p>
      </div>

      {/* Payment Methods List */}
      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={`border rounded-lg p-4 ${
              method.isDefault
                ? "border-gray-900 bg-gray-50"
                : "border-gray-200 hover:border-gray-300"
            } transition-colors`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getMethodIcon(method.type)}
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-gray-900">{method.name}</h4>
                    {method.isDefault && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-900 text-white">
                        <Check className="w-3 h-3 mr-1" />
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{method.details}</p>
                  {method.lastUsed && (
                    <p className="text-xs text-gray-500 mt-1">
                      Last used {method.lastUsed}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {!method.isDefault && (
                  <button
                    onClick={() => setDefaultPayment(method.id)}
                    className="text-sm text-gray-600 hover:text-gray-900 px-3 py-1 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    Set Default
                  </button>
                )}
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors cursor-pointer">
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => removePaymentMethod(method.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Payment Method */}
      {!showAddForm ? (
        <button
          onClick={() => setShowAddForm(true)}
          className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors group cursor-pointer"
        >
          <Plus className="w-6 h-6 text-gray-400 mx-auto mb-2 group-hover:text-gray-600" />
          <span className="text-sm font-medium text-gray-600 group-hover:text-gray-800">
            Add New Payment Method
          </span>
        </button>
      ) : (
        <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
          <h4 className="font-medium text-gray-900 mb-4">Add Payment Method</h4>

          {/* Payment Type Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Type
            </label>
            <div className="flex space-x-4">
              {[
                { value: "card", label: "Credit/Debit Card", icon: CreditCard },
                { value: "bank", label: "Bank Account", icon: Building },
                { value: "momo", label: "Mobile Money", icon: Smartphone },
              ].map(({ value, label, icon: Icon }) => (
                <label
                  key={value}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="paymentType"
                    value={value}
                    checked={newMethodType === value}
                    onChange={(e) =>
                      setNewMethodType(
                        e.target.value as "card" | "bank" | "momo"
                      )
                    }
                    className="w-4 h-4 accent-black cursor-pointer focus:ring-black focus:ring-2"
                  />
                  <Icon className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-900">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Form Fields Based on Type */}
          <div className="space-y-4">
            {newMethodType === "card" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                </div>
              </>
            )}

            {newMethodType === "bank" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter bank name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Account Number
                  </label>
                  <input
                    type="text"
                    placeholder="Enter account number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
              </>
            )}

            {newMethodType === "momo" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile Network
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent">
                    <option>MTN Mobile Money</option>
                    <option>Airtel Money</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    placeholder="+250 123 456 789"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Display Name
              </label>
              <input
                type="text"
                placeholder="My Primary Card"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-md hover:bg-gray-800 transition-colors">
              Add Payment Method
            </button>
          </div>
        </div>
      )}

      {/* Security Notice */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="w-5 h-5 bg-gray-900 rounded-full flex items-center justify-center mt-0.5">
            <Check className="w-3 h-3 text-white" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-900">
              Secure Payments
            </h4>
            <p className="text-sm text-gray-600 mt-1">
              Your payment information is encrypted and securely stored. We
              never store your full card details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
