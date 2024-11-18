import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search as SearchIcon, Calendar, Car, User, ShieldCheck, AlertTriangle } from 'lucide-react';
import { getVehicleDetails } from '../features/vehicles/vehicleSlice';
import toast from 'react-hot-toast';

const Search = () => {
  const dispatch = useDispatch();
  const { isLoading, vehicleData, error } = useSelector(state => state.vehicle);
  const [vehicleNumber, setVehicleNumber] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      await dispatch(getVehicleDetails({ veh_num: vehicleNumber })).unwrap();
    } catch (error) {
      toast.error(error?.message || 'Failed to fetch vehicle details');
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Search Form */}
        <div>
          <h1 className="text-3xl font-bold mb-6 text-white">Search Vehicles</h1>
          <div className="bg-white/10 rounded-lg p-8 backdrop-blur-sm">
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="group">
                <label className="block text-sm font-medium text-white/60 mb-2">
                  Vehicle Registration Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-5 text-white/40 group-focus-within:text-[#1DB954] transition-colors" />
                  </div>
                  <input
                    type="text"
                    value={vehicleNumber}
                    onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg
                      focus:outline-none focus:border-[#1DB954] transition-all duration-300
                      text-white placeholder-white/40 uppercase"
                    placeholder="Enter vehicle number (e.g., DL01AB1234)"
                    
                    title="Please enter a valid vehicle number format: DL01AB1234"
                    required
                  />
                </div>
                <p className="mt-2 text-sm text-white/40">
                  Format: State Code (2) + Numeric (2) + Alphabets (2) + Numeric (4)
                </p>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-[#1DB954] text-black rounded-lg hover:bg-[#1DB954]/90
                  transition-all duration-300 flex items-center justify-center gap-2
                  disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin h-5 w-5 border-2 border-black/20 border-t-black rounded-full" />
                    Searching...
                  </>
                ) : (
                  <>
                    <SearchIcon className="w-5 h-5" />
                    Search Vehicle
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Results Section */}
        {vehicleData && (
          <div className="bg-white/10 rounded-lg p-8 backdrop-blur-sm">
            <div className="space-y-6">
              {/* Vehicle Image */}
              {vehicleData.header_element?.imageUrl && (
                <img 
                  src={vehicleData.header_element.imageUrl} 
                  alt="Vehicle" 
                  className="w-full rounded-lg object-cover h-48"
                />
              )}

              {/* Vehicle Info */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">
                  {vehicleData.header_element?.title || 'Vehicle Details'}
                </h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-[#1DB954]">
                      <Car className="w-5 h-5" />
                      <span className="font-medium">Vehicle Number</span>
                    </div>
                    <p className="mt-1 text-white/90">{vehicleData.vehNum}</p>
                  </div>

                  <div className="bg-white/5 p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-[#1DB954]">
                      <User className="w-5 h-5" />
                      <span className="font-medium">Owner</span>
                    </div>
                    <p className="mt-1 text-white/90">{vehicleData.header_element?.ownerName || 'N/A'}</p>
                  </div>

                  {vehicleData.header_element?.vehicleDetails?.map((detail, index) => (
                    <div key={index} className="bg-white/5 p-4 rounded-lg">
                      <div className="flex items-center gap-2 text-[#1DB954]">
                        {detail.type === 'INSURANCE' ? (
                          <ShieldCheck className="w-5 h-5" />
                        ) : (
                          <AlertTriangle className="w-5 h-5" />
                        )}
                        <span className="font-medium">{detail.label}</span>
                      </div>
                      <p className="mt-1 text-white/90">{detail.value}</p>
                    </div>
                  ))}
                </div>

                {vehicleData.header_element?.ownership && (
                  <div className="bg-white/5 p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-[#1DB954]">
                      <Calendar className="w-5 h-5" />
                      <span className="font-medium">Ownership</span>
                    </div>
                    <p className="mt-1 text-white/90">{vehicleData.header_element.ownership}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;