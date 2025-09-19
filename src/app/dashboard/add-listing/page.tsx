"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Car, List, Info, Image } from "lucide-react";
import ProgressStepper from "@/components/shared/ProgressStepper";
import Button from "@/components/shared/Button";
import Input from "@/components/shared/Input";
import Select from "@/components/shared/Select";
import Textarea from "@/components/shared/Textarea";
import Checkbox from "@/components/shared/Checkbox";

const steps = [
  { id: "listing", title: "Listing Information", icon: <Car className="w-5 h-5" /> },
  { id: "features", title: "Features", icon: <List className="w-5 h-5" /> },
  { id: "info", title: "Info", icon: <Info className="w-5 h-5" /> },
  { id: "image", title: "Image", icon: <Image className="w-5 h-5" /> },
];

// Mock user data
const user = {
  name: "Benny Chrispin",
  email: "ndizibaidu23@gmail.com",
  avatar: "/images/abstract-user-flat-4.png"
};

export default function AddListingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  
  // Listing Information form state
  const [listingInfo, setListingInfo] = useState({
    listingTitle: "Range Rover Evoque",
    make: "Range Rover Evoque",
    model: "Range Rover Evoque",
    body: "Range Rover Evoque",
    mileage: "450km per rental",
    fuelType: "Range Rover Evoque",
    year: "2020",
    transmission: "Automatics",
    driverType: "Range Rover Evoque",
    engineSize: "Range Rover Evoque",
    doors: "Range Rover Evoque",
    smallBags: "2 Small Bags",
    color: "Range Rover Evoque",
    plateNo: "RAH2002C",
    largeBags: "2 Large Bags",
    inTerminal: "Kigali Kacyiru near Embassy of USA",
    description: "Range Rover Evoque",
  });

  // Features form state
  const [features, setFeatures] = useState({
    // Comfort
    powerSteering: false,
    cruiseControl: false,
    navigation: true,
    powerLocks: false,
    vanityMirror: false,
    trunkLight: false,
    
    // Interior
    airConditioner: false,
    techometer: false,
    digitalOdometer: false,
    leatherSeats: false,
    heater: false,
    memorySeats: false,
    
    // Exterior
    fogLightsFront: false,
    rainSensingWipe: false,
    rearSpoiler: false,
    sunRoof: false,
    rearWindow: false,
    windowDefroster: false,
    
    // Safety
    brakeAssist: false,
    childSafetyLocks: false,
    tractionControl: false,
    powerDoorLocks: false,
    driverAirBag: false,
    antiLockBrakes: false,
  });

  const [price, setPrice] = useState({
    negotiable: false,
    pricePerDay: "40,000",
    currency: "RWF",
  });

  const fuelTypeOptions = [
    { value: "petrol", label: "Petrol" },
    { value: "diesel", label: "Diesel" },
    { value: "electric", label: "Electric" },
    { value: "hybrid", label: "Hybrid" },
  ];

  const yearOptions = Array.from({ length: 25 }, (_, i) => {
    const year = new Date().getFullYear() - i;
    return { value: year.toString(), label: year.toString() };
  });

  const transmissionOptions = [
    { value: "manual", label: "Manual" },
    { value: "automatic", label: "Automatic" },
    { value: "semi-automatic", label: "Semi-Automatic" },
  ];

  const currencyOptions = [
    { value: "RWF", label: "RWF" },
    { value: "USD", label: "USD" },
    { value: "EUR", label: "EUR" },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleDiscard = () => {
    router.push("/dashboard/listing");
  };

  const handleSaveChanges = () => {
    if (currentStep < steps.length - 1) {
      // Move to next step
      setCurrentStep(currentStep + 1);
    } else {
      // Save all data (last step)
      console.log("Saving car details:", { listingInfo, features, price });
      // TODO: Implement actual save functionality
      router.push("/dashboard/listing");
    }
  };

  const updateListingInfo = (field: string, value: string) => {
    setListingInfo(prev => ({ ...prev, [field]: value }));
  };

  const updateFeature = (feature: string, checked: boolean) => {
    setFeatures(prev => ({ ...prev, [feature]: checked }));
  };

  const updatePrice = (field: string, value: string | boolean) => {
    setPrice(prev => ({ ...prev, [field]: value }));
  };

  const renderListingInformation = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Listing Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Listing Title"
          value={listingInfo.listingTitle}
          onChange={(value) => updateListingInfo("listingTitle", value)}
        />
        
        <Input
          label="Make"
          value={listingInfo.make}
          onChange={(value) => updateListingInfo("make", value)}
        />
        
        <Input
          label="Model"
          value={listingInfo.model}
          onChange={(value) => updateListingInfo("model", value)}
        />
        
        <Input
          label="Body"
          value={listingInfo.body}
          onChange={(value) => updateListingInfo("body", value)}
        />
        
        <Input
          label="Mileage"
          value={listingInfo.mileage}
          onChange={(value) => updateListingInfo("mileage", value)}
        />
        
        <Select
          label="Fuel Type"
          value={listingInfo.fuelType}
          onChange={(value) => updateListingInfo("fuelType", value)}
          options={fuelTypeOptions}
        />
        
        <Select
          label="Year"
          value={listingInfo.year}
          onChange={(value) => updateListingInfo("year", value)}
          options={yearOptions}
        />
        
        <Select
          label="Transmission"
          value={listingInfo.transmission}
          onChange={(value) => updateListingInfo("transmission", value)}
          options={transmissionOptions}
        />
        
        <Input
          label="Driver Type"
          value={listingInfo.driverType}
          onChange={(value) => updateListingInfo("driverType", value)}
        />
        
        <Input
          label="Engine Size"
          value={listingInfo.engineSize}
          onChange={(value) => updateListingInfo("engineSize", value)}
        />
        
        <Input
          label="Doors"
          value={listingInfo.doors}
          onChange={(value) => updateListingInfo("doors", value)}
        />
        
        <Input
          label="Small Bags"
          value={listingInfo.smallBags}
          onChange={(value) => updateListingInfo("smallBags", value)}
        />
        
        <Input
          label="Color"
          value={listingInfo.color}
          onChange={(value) => updateListingInfo("color", value)}
        />
        
        <Input
          label="Plate No"
          value={listingInfo.plateNo}
          onChange={(value) => updateListingInfo("plateNo", value)}
        />
        
        <Input
          label="Large Bags"
          value={listingInfo.largeBags}
          onChange={(value) => updateListingInfo("largeBags", value)}
        />
        
        <Input
          label="In Terminal"
          value={listingInfo.inTerminal}
          onChange={(value) => updateListingInfo("inTerminal", value)}
          className="md:col-span-2"
        />
        
        <Textarea
          label="Description"
          value={listingInfo.description}
          onChange={(value) => updateListingInfo("description", value)}
          rows={4}
          className="md:col-span-2"
        />
      </div>
    </div>
  );

  const renderFeatures = () => (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">Features</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Comfort */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Comfort</h3>
          <div className="space-y-3">
            <Checkbox
              label="Power Steering"
              checked={features.powerSteering}
              onChange={(checked) => updateFeature("powerSteering", checked)}
            />
            <Checkbox
              label="Cruise Control"
              checked={features.cruiseControl}
              onChange={(checked) => updateFeature("cruiseControl", checked)}
            />
            <Checkbox
              label="Navigation"
              checked={features.navigation}
              onChange={(checked) => updateFeature("navigation", checked)}
            />
            <Checkbox
              label="Power Locks"
              checked={features.powerLocks}
              onChange={(checked) => updateFeature("powerLocks", checked)}
            />
            <Checkbox
              label="Vanity Mirror"
              checked={features.vanityMirror}
              onChange={(checked) => updateFeature("vanityMirror", checked)}
            />
            <Checkbox
              label="Trunk Light"
              checked={features.trunkLight}
              onChange={(checked) => updateFeature("trunkLight", checked)}
            />
          </div>
        </div>

        {/* Interior */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Interior</h3>
          <div className="space-y-3">
            <Checkbox
              label="Air Conditioner"
              checked={features.airConditioner}
              onChange={(checked) => updateFeature("airConditioner", checked)}
            />
            <Checkbox
              label="Techometer"
              checked={features.techometer}
              onChange={(checked) => updateFeature("techometer", checked)}
            />
            <Checkbox
              label="Digital Odometer"
              checked={features.digitalOdometer}
              onChange={(checked) => updateFeature("digitalOdometer", checked)}
            />
            <Checkbox
              label="Leather Seats"
              checked={features.leatherSeats}
              onChange={(checked) => updateFeature("leatherSeats", checked)}
            />
            <Checkbox
              label="Heater"
              checked={features.heater}
              onChange={(checked) => updateFeature("heater", checked)}
            />
            <Checkbox
              label="Memory Seats"
              checked={features.memorySeats}
              onChange={(checked) => updateFeature("memorySeats", checked)}
            />
          </div>
        </div>

        {/* Exterior */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Exterior</h3>
          <div className="space-y-3">
            <Checkbox
              label="Fog Lights Front"
              checked={features.fogLightsFront}
              onChange={(checked) => updateFeature("fogLightsFront", checked)}
            />
            <Checkbox
              label="Rain Sensing Wipe"
              checked={features.rainSensingWipe}
              onChange={(checked) => updateFeature("rainSensingWipe", checked)}
            />
            <Checkbox
              label="Rear Spoiler"
              checked={features.rearSpoiler}
              onChange={(checked) => updateFeature("rearSpoiler", checked)}
            />
            <Checkbox
              label="Sun Roof"
              checked={features.sunRoof}
              onChange={(checked) => updateFeature("sunRoof", checked)}
            />
            <Checkbox
              label="Rear Window"
              checked={features.rearWindow}
              onChange={(checked) => updateFeature("rearWindow", checked)}
            />
            <Checkbox
              label="Window Defroster"
              checked={features.windowDefroster}
              onChange={(checked) => updateFeature("windowDefroster", checked)}
            />
          </div>
        </div>

        {/* Safety */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Safety</h3>
          <div className="space-y-3">
            <Checkbox
              label="Brake Assist"
              checked={features.brakeAssist}
              onChange={(checked) => updateFeature("brakeAssist", checked)}
            />
            <Checkbox
              label="Child Safety Locks"
              checked={features.childSafetyLocks}
              onChange={(checked) => updateFeature("childSafetyLocks", checked)}
            />
            <Checkbox
              label="Traction Control"
              checked={features.tractionControl}
              onChange={(checked) => updateFeature("tractionControl", checked)}
            />
            <Checkbox
              label="Power Door Locks"
              checked={features.powerDoorLocks}
              onChange={(checked) => updateFeature("powerDoorLocks", checked)}
            />
            <Checkbox
              label="Driver Air Bag"
              checked={features.driverAirBag}
              onChange={(checked) => updateFeature("driverAirBag", checked)}
            />
            <Checkbox
              label="Anti-lock Brakes"
              checked={features.antiLockBrakes}
              onChange={(checked) => updateFeature("antiLockBrakes", checked)}
            />
          </div>
        </div>
      </div>

      {/* Price Section */}
      <div className="space-y-6 pt-8 border-t border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900">Price</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center">
            <Checkbox
              label="Negotiable"
              checked={price.negotiable}
              onChange={(checked) => updatePrice("negotiable", checked)}
            />
          </div>
          
          <Input
            label="Price/Day"
            value={price.pricePerDay}
            onChange={(value) => updatePrice("pricePerDay", value)}
          />
          
          <Select
            label="Currency"
            value={price.currency}
            onChange={(value) => updatePrice("currency", value)}
            options={currencyOptions}
          />
        </div>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return renderListingInformation();
      case 1:
        return renderFeatures();
      default:
        return <div>Step not implemented yet</div>;
    }
  };

  return (
    <div className="flex-1 p-4 lg:p-8 h-full overflow-auto bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Progress Stepper */}
        <div className="mb-8">
          <ProgressStepper steps={steps} currentStep={currentStep} />
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {renderCurrentStep()}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-8">
          <div className="flex space-x-4">
            <Button variant="outline" onClick={handleDiscard}>
              Discard
            </Button>
            {currentStep > 0 && (
              <Button variant="outline" onClick={handlePrevious}>
                Previous
              </Button>
            )}
          </div>
          <Button onClick={handleSaveChanges}>
            {currentStep < steps.length - 1 ? "Next" : "Save changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}
