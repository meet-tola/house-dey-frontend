import { Building, Home, School, MapPin, AlertTriangle } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 mt-10">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h2 className="text-2xl leading-6 font-bold text-gray-900">Welcome to HouseDey</h2>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">The Upwork of Real Estate</p>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">What we do</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      HouseDey is a platform that links people seeking to buy or rent properties with
                      agents/individuals/companies that are selling or renting out properties.
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Our advantage</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      With HouseDey, your wait is over. You no longer have to wait for too long before seeing a property of
                      your choice. Agents can cut down the time it takes them to rent or sell out
                      a property due to the big visibility HouseDey offers to their listed properties.
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Safety measures</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      Our agents go through identity verification to ensure that the incident of scam is reduced on our
                      platform, while we continue to provide seamless service to property seekers.
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Available Property Types</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Properties that can be listed on HouseDey</p>
              </div>
              <div className="border-t border-gray-200">
                <ul className="divide-y divide-gray-200">
                  <li className="px-4 py-4 sm:px-6">
                    <div className="flex items-center">
                      <Building className="flex-shrink-0 mr-3 h-5 w-5 text-gray-400" />
                      <p className="text-sm font-medium text-gray-900">Apartments/Flats/Office Spaces</p>
                    </div>
                  </li>
                  <li className="px-4 py-4 sm:px-6">
                    <div className="flex items-center">
                      <Home className="flex-shrink-0 mr-3 h-5 w-5 text-gray-400" />
                      <p className="text-sm font-medium text-gray-900">Fully Built Houses/Duplexes/Mansions</p>
                    </div>
                  </li>
                  <li className="px-4 py-4 sm:px-6">
                    <div className="flex items-center">
                      <School className="flex-shrink-0 mr-3 h-5 w-5 text-gray-400" />
                      <p className="text-sm font-medium text-gray-900">Hostels for students</p>
                    </div>
                  </li>
                  <li className="px-4 py-4 sm:px-6">
                    <div className="flex items-center">
                      <Building className="flex-shrink-0 mr-3 h-5 w-5 text-gray-400" />
                      <p className="text-sm font-medium text-gray-900">Shops</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Not Permitted for Listing</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Properties that cannot be listed on HouseDey</p>
              </div>
              <div className="border-t border-gray-200">
                <ul className="divide-y divide-gray-200">
                  <li className="px-4 py-4 sm:px-6">
                    <div className="flex items-center">
                      <AlertTriangle className="flex-shrink-0 mr-3 h-5 w-5 text-yellow-400" />
                      <p className="text-sm font-medium text-gray-900">Bare lands</p>
                    </div>
                  </li>
                  <li className="px-4 py-4 sm:px-6">
                    <div className="flex items-center">
                      <AlertTriangle className="flex-shrink-0 mr-3 h-5 w-5 text-yellow-400" />
                      <p className="text-sm font-medium text-gray-900">Places of worship</p>
                    </div>
                  </li>
                  <li className="px-4 py-4 sm:px-6">
                    <div className="flex items-center">
                      <AlertTriangle className="flex-shrink-0 mr-3 h-5 w-5 text-yellow-400" />
                      <p className="text-sm font-medium text-gray-900">Schools</p>
                    </div>
                  </li>
                  <li className="px-4 py-4 sm:px-6">
                    <div className="flex items-center">
                      <AlertTriangle className="flex-shrink-0 mr-3 h-5 w-5 text-yellow-400" />
                      <p className="text-sm font-medium text-gray-900">Any other property not mentioned under 'available for listing'</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">HouseDey Features</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">What you can do on our platform</p>
              </div>
              <div className="border-t border-gray-200">
                <ul className="divide-y divide-gray-200">
                  <li className="px-4 py-4 sm:px-6">
                    <div className="flex items-center">
                      <Home className="flex-shrink-0 mr-3 h-5 w-5 text-green-400" />
                      <p className="text-sm font-medium text-gray-900">List/find properties for sale/rent</p>
                    </div>
                  </li>
                  <li className="px-4 py-4 sm:px-6">
                    <div className="flex items-center">
                      <Building className="flex-shrink-0 mr-3 h-5 w-5 text-green-400" />
                      <p className="text-sm font-medium text-gray-900">Engage with agents/individuals</p>
                    </div>
                  </li>
                  <li className="px-4 py-4 sm:px-6">
                    <div className="flex items-center">
                      <MapPin className="flex-shrink-0 mr-3 h-5 w-5 text-green-400" />
                      <p className="text-sm font-medium text-gray-900">Use our integrated geo-satellite feature to inspect the environment around any property</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}