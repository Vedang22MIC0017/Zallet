// Real city locations and areas for Indian cities
export interface CityLocation {
  name: string
  coordinates: { lat: number; lng: number }
  areas: Array<{
    name: string
    coordinates: { lat: number; lng: number }
    type: 'commercial' | 'residential' | 'industrial' | 'public' | 'transport' | 'educational' | 'healthcare' | 'entertainment'
  }>
}

export const cityLocations: { [key: string]: CityLocation } = {
  'Delhi': {
    name: 'Delhi',
    coordinates: { lat: 28.6139, lng: 77.2090 },
    areas: [
      { name: 'Connaught Place', coordinates: { lat: 28.6315, lng: 77.2167 }, type: 'commercial' },
      { name: 'Chandni Chowk', coordinates: { lat: 28.6562, lng: 77.2310 }, type: 'commercial' },
      { name: 'Karol Bagh', coordinates: { lat: 28.6517, lng: 77.1909 }, type: 'residential' },
      { name: 'Lajpat Nagar', coordinates: { lat: 28.5679, lng: 77.2431 }, type: 'residential' },
      { name: 'Rohini', coordinates: { lat: 28.7406, lng: 77.0886 }, type: 'residential' },
      { name: 'Dwarka', coordinates: { lat: 28.5921, lng: 77.0465 }, type: 'residential' },
      { name: 'Gurgaon Sector 29', coordinates: { lat: 28.4595, lng: 77.0266 }, type: 'commercial' },
      { name: 'India Gate', coordinates: { lat: 28.6129, lng: 77.2295 }, type: 'public' },
      { name: 'Red Fort', coordinates: { lat: 28.6562, lng: 77.2410 }, type: 'public' },
      { name: 'New Delhi Railway Station', coordinates: { lat: 28.6448, lng: 77.2187 }, type: 'transport' }
    ]
  },
  'Mumbai': {
    name: 'Mumbai',
    coordinates: { lat: 19.0760, lng: 72.8777 },
    areas: [
      { name: 'Marine Drive', coordinates: { lat: 18.9441, lng: 72.8223 }, type: 'public' },
      { name: 'Bandra Kurla Complex', coordinates: { lat: 19.0596, lng: 72.8295 }, type: 'commercial' },
      { name: 'Andheri West', coordinates: { lat: 19.1197, lng: 72.8464 }, type: 'residential' },
      { name: 'Powai', coordinates: { lat: 19.1176, lng: 72.9060 }, type: 'residential' },
      { name: 'Juhu', coordinates: { lat: 19.1078, lng: 72.8262 }, type: 'residential' },
      { name: 'Dadar', coordinates: { lat: 19.0176, lng: 72.8562 }, type: 'commercial' },
      { name: 'CST Station', coordinates: { lat: 18.9401, lng: 72.8355 }, type: 'transport' },
      { name: 'Gateway of India', coordinates: { lat: 18.9220, lng: 72.8347 }, type: 'public' },
      { name: 'Worli', coordinates: { lat: 19.0176, lng: 72.8262 }, type: 'commercial' },
      { name: 'Malad', coordinates: { lat: 19.1868, lng: 72.8486 }, type: 'residential' }
    ]
  },
  'Chennai': {
    name: 'Chennai',
    coordinates: { lat: 13.0827, lng: 80.2707 },
    areas: [
      { name: 'T. Nagar', coordinates: { lat: 13.0418, lng: 80.2341 }, type: 'commercial' },
      { name: 'Anna Nagar', coordinates: { lat: 13.0878, lng: 80.2206 }, type: 'residential' },
      { name: 'Velachery', coordinates: { lat: 12.9816, lng: 80.2206 }, type: 'residential' },
      { name: 'Adyar', coordinates: { lat: 13.0067, lng: 80.2206 }, type: 'residential' },
      { name: 'Mylapore', coordinates: { lat: 13.0339, lng: 80.2620 }, type: 'residential' },
      { name: 'Egmore', coordinates: { lat: 13.0827, lng: 80.2620 }, type: 'commercial' },
      { name: 'Central Railway Station', coordinates: { lat: 13.0827, lng: 80.2707 }, type: 'transport' },
      { name: 'Marina Beach', coordinates: { lat: 13.0418, lng: 80.2864 }, type: 'public' },
      { name: 'Guindy', coordinates: { lat: 13.0067, lng: 80.2206 }, type: 'commercial' },
      { name: 'Tambaram', coordinates: { lat: 12.9249, lng: 80.1272 }, type: 'residential' }
    ]
  },
  'Bangalore': {
    name: 'Bangalore',
    coordinates: { lat: 12.9716, lng: 77.5946 },
    areas: [
      { name: 'MG Road', coordinates: { lat: 12.9754, lng: 77.6101 }, type: 'commercial' },
      { name: 'Koramangala', coordinates: { lat: 12.9279, lng: 77.6271 }, type: 'residential' },
      { name: 'Whitefield', coordinates: { lat: 12.9698, lng: 77.7500 }, type: 'residential' },
      { name: 'Electronic City', coordinates: { lat: 12.8456, lng: 77.6603 }, type: 'commercial' },
      { name: 'Indiranagar', coordinates: { lat: 12.9716, lng: 77.6406 }, type: 'residential' },
      { name: 'Jayanagar', coordinates: { lat: 12.9279, lng: 77.5839 }, type: 'residential' },
      { name: 'City Railway Station', coordinates: { lat: 12.9716, lng: 77.5946 }, type: 'transport' },
      { name: 'Cubbon Park', coordinates: { lat: 12.9716, lng: 77.5946 }, type: 'public' },
      { name: 'Marathahalli', coordinates: { lat: 12.9584, lng: 77.7014 }, type: 'residential' },
      { name: 'HSR Layout', coordinates: { lat: 12.9116, lng: 77.6460 }, type: 'residential' }
    ]
  },
  'Pune': {
    name: 'Pune',
    coordinates: { lat: 18.5204, lng: 73.8567 },
    areas: [
      { name: 'Koregaon Park', coordinates: { lat: 18.5404, lng: 73.8967 }, type: 'residential' },
      { name: 'Baner', coordinates: { lat: 18.5604, lng: 73.7767 }, type: 'residential' },
      { name: 'Hinjewadi', coordinates: { lat: 18.5804, lng: 73.7367 }, type: 'commercial' },
      { name: 'Viman Nagar', coordinates: { lat: 18.5704, lng: 73.9167 }, type: 'residential' },
      { name: 'Aundh', coordinates: { lat: 18.5504, lng: 73.8067 }, type: 'residential' },
      { name: 'Pune Railway Station', coordinates: { lat: 18.5204, lng: 73.8567 }, type: 'transport' },
      { name: 'Shivajinagar', coordinates: { lat: 18.5204, lng: 73.8567 }, type: 'commercial' },
      { name: 'Katraj', coordinates: { lat: 18.4504, lng: 73.8667 }, type: 'residential' },
      { name: 'Hadapsar', coordinates: { lat: 18.5004, lng: 73.9267 }, type: 'residential' },
      { name: 'Kothrud', coordinates: { lat: 18.5004, lng: 73.8067 }, type: 'residential' }
    ]
  },
  'Hyderabad': {
    name: 'Hyderabad',
    coordinates: { lat: 17.3850, lng: 78.4867 },
    areas: [
      { name: 'HITEC City', coordinates: { lat: 17.4450, lng: 78.3467 }, type: 'commercial' },
      { name: 'Gachibowli', coordinates: { lat: 17.4350, lng: 78.3567 }, type: 'residential' },
      { name: 'Banjara Hills', coordinates: { lat: 17.4150, lng: 78.4567 }, type: 'residential' },
      { name: 'Jubilee Hills', coordinates: { lat: 17.4250, lng: 78.4167 }, type: 'residential' },
      { name: 'Secunderabad', coordinates: { lat: 17.4350, lng: 78.4967 }, type: 'commercial' },
      { name: 'Charminar', coordinates: { lat: 17.3616, lng: 78.4747 }, type: 'public' },
      { name: 'Secunderabad Railway Station', coordinates: { lat: 17.4350, lng: 78.4967 }, type: 'transport' },
      { name: 'Kondapur', coordinates: { lat: 17.4850, lng: 78.3867 }, type: 'residential' },
      { name: 'Madhapur', coordinates: { lat: 17.4550, lng: 78.3767 }, type: 'commercial' },
      { name: 'Begumpet', coordinates: { lat: 17.4350, lng: 78.4667 }, type: 'commercial' }
    ]
  },
  'Ahmedabad': {
    name: 'Ahmedabad',
    coordinates: { lat: 23.0225, lng: 72.5714 },
    areas: [
      { name: 'CG Road', coordinates: { lat: 23.0325, lng: 72.5814 }, type: 'commercial' },
      { name: 'Satellite', coordinates: { lat: 23.0525, lng: 72.5314 }, type: 'residential' },
      { name: 'Bodakdev', coordinates: { lat: 23.0425, lng: 72.5214 }, type: 'residential' },
      { name: 'Vastrapur', coordinates: { lat: 23.0125, lng: 72.5514 }, type: 'residential' },
      { name: 'Maninagar', coordinates: { lat: 23.0025, lng: 72.6014 }, type: 'residential' },
      { name: 'Ahmedabad Railway Station', coordinates: { lat: 23.0225, lng: 72.5714 }, type: 'transport' },
      { name: 'Sabarmati Ashram', coordinates: { lat: 23.0625, lng: 72.5814 }, type: 'public' },
      { name: 'Navrangpura', coordinates: { lat: 23.0425, lng: 72.5614 }, type: 'commercial' },
      { name: 'Paldi', coordinates: { lat: 23.0125, lng: 72.5614 }, type: 'residential' },
      { name: 'Gandhinagar', coordinates: { lat: 23.2225, lng: 72.6514 }, type: 'residential' }
    ]
  },
  'Kolkata': {
    name: 'Kolkata',
    coordinates: { lat: 22.5726, lng: 88.3639 },
    areas: [
      { name: 'Salt Lake City', coordinates: { lat: 22.5867, lng: 88.4173 }, type: 'residential' },
      { name: 'Park Street', coordinates: { lat: 22.5536, lng: 88.3503 }, type: 'commercial' },
      { name: 'Howrah', coordinates: { lat: 22.5958, lng: 88.2636 }, type: 'transport' },
      { name: 'New Town', coordinates: { lat: 22.5952, lng: 88.4799 }, type: 'residential' },
      { name: 'Esplanade', coordinates: { lat: 22.5626, lng: 88.3516 }, type: 'commercial' },
      { name: 'Dum Dum', coordinates: { lat: 22.6336, lng: 88.4220 }, type: 'residential' },
      { name: 'Sealdah', coordinates: { lat: 22.5676, lng: 88.3697 }, type: 'transport' },
      { name: 'Shyambazar', coordinates: { lat: 22.6062, lng: 88.3730 }, type: 'residential' },
      { name: 'Ballygunge', coordinates: { lat: 22.5286, lng: 88.3650 }, type: 'residential' },
      { name: 'Victoria Memorial', coordinates: { lat: 22.5448, lng: 88.3426 }, type: 'public' }
    ]
  },
  'Jaipur': {
    name: 'Jaipur',
    coordinates: { lat: 26.9124, lng: 75.7873 },
    areas: [
      { name: 'Malviya Nagar', coordinates: { lat: 26.8500, lng: 75.8100 }, type: 'residential' },
      { name: 'Vaishali Nagar', coordinates: { lat: 26.9000, lng: 75.7300 }, type: 'residential' },
      { name: 'Tonk Road', coordinates: { lat: 26.8500, lng: 75.7900 }, type: 'commercial' },
      { name: 'Mansarovar', coordinates: { lat: 26.8500, lng: 75.7700 }, type: 'residential' },
      { name: 'Amer Fort', coordinates: { lat: 26.9855, lng: 75.8513 }, type: 'public' },
      { name: 'Johari Bazaar', coordinates: { lat: 26.9195, lng: 75.8194 }, type: 'commercial' },
      { name: 'Ajmer Road', coordinates: { lat: 26.8800, lng: 75.7300 }, type: 'commercial' },
      { name: 'Sanganer', coordinates: { lat: 26.8200, lng: 75.7800 }, type: 'residential' },
      { name: 'Raja Park', coordinates: { lat: 26.9000, lng: 75.8200 }, type: 'residential' },
      { name: 'Civil Lines', coordinates: { lat: 26.9000, lng: 75.7800 }, type: 'residential' }
    ]
  },

  'Lucknow': {
    name: 'Lucknow',
    coordinates: { lat: 26.8467, lng: 80.9462 },
    areas: [
      { name: 'Hazratganj', coordinates: { lat: 26.8500, lng: 80.9500 }, type: 'commercial' },
      { name: 'Gomti Nagar', coordinates: { lat: 26.8600, lng: 81.0000 }, type: 'residential' },
      { name: 'Alambagh', coordinates: { lat: 26.8200, lng: 80.9000 }, type: 'residential' },
      { name: 'Charbagh', coordinates: { lat: 26.8300, lng: 80.9200 }, type: 'transport' },
      { name: 'Aminabad', coordinates: { lat: 26.8500, lng: 80.9400 }, type: 'commercial' },
      { name: 'Indira Nagar', coordinates: { lat: 26.8700, lng: 81.0000 }, type: 'residential' },
      { name: 'Vikas Nagar', coordinates: { lat: 26.8800, lng: 80.9800 }, type: 'residential' },
      { name: 'Rajajipuram', coordinates: { lat: 26.8400, lng: 80.9100 }, type: 'residential' },
      { name: 'Chowk', coordinates: { lat: 26.8600, lng: 80.9400 }, type: 'commercial' },
      { name: 'Janeshwar Mishra Park', coordinates: { lat: 26.8600, lng: 81.0100 }, type: 'public' }
    ]
  },
  'Kanpur': {
    name: 'Kanpur',
    coordinates: { lat: 26.4499, lng: 80.3319 },
    areas: [
      { name: 'Swaroop Nagar', coordinates: { lat: 26.4800, lng: 80.3200 }, type: 'residential' },
      { name: 'Govind Nagar', coordinates: { lat: 26.4300, lng: 80.3200 }, type: 'residential' },
      { name: 'Panki', coordinates: { lat: 26.4400, lng: 80.2700 }, type: 'industrial' },
      { name: 'Mall Road', coordinates: { lat: 26.4700, lng: 80.3400 }, type: 'commercial' },
      { name: 'Civil Lines', coordinates: { lat: 26.4600, lng: 80.3500 }, type: 'commercial' },
      { name: 'Kalyanpur', coordinates: { lat: 26.4800, lng: 80.2800 }, type: 'residential' },
      { name: 'Railway Station', coordinates: { lat: 26.4600, lng: 80.3300 }, type: 'transport' },
      { name: 'Fazalganj', coordinates: { lat: 26.4500, lng: 80.3100 }, type: 'industrial' },
      { name: 'Kidwai Nagar', coordinates: { lat: 26.4300, lng: 80.3400 }, type: 'residential' },
      { name: 'Naveen Market', coordinates: { lat: 26.4600, lng: 80.3500 }, type: 'commercial' }
    ]
  },
  'Surat': {
    name: 'Surat',
    coordinates: { lat: 21.1702, lng: 72.8311 },
    areas: [
      { name: 'Adajan', coordinates: { lat: 21.2000, lng: 72.8000 }, type: 'residential' },
      { name: 'Vesu', coordinates: { lat: 21.1500, lng: 72.7900 }, type: 'residential' },
      { name: 'Varachha', coordinates: { lat: 21.2200, lng: 72.8500 }, type: 'residential' },
      { name: 'Ring Road', coordinates: { lat: 21.1700, lng: 72.8300 }, type: 'commercial' },
      { name: 'Katargam', coordinates: { lat: 21.2100, lng: 72.8500 }, type: 'residential' },
      { name: 'Udhna', coordinates: { lat: 21.1400, lng: 72.8300 }, type: 'industrial' },
      { name: 'Surat Railway Station', coordinates: { lat: 21.1950, lng: 72.8400 }, type: 'transport' },
      { name: 'Athwa Lines', coordinates: { lat: 21.1800, lng: 72.7900 }, type: 'residential' },
      { name: 'Dumas Beach', coordinates: { lat: 21.0800, lng: 72.7100 }, type: 'public' },
      { name: 'Pal', coordinates: { lat: 21.2100, lng: 72.7900 }, type: 'residential' }
    ]
  },
  'Nagpur': {
    name: 'Nagpur',
    coordinates: { lat: 21.1458, lng: 79.0882 },
    areas: [
      { name: 'Dharampeth', coordinates: { lat: 21.1500, lng: 79.0800 }, type: 'residential' },
      { name: 'Sitabuldi', coordinates: { lat: 21.1500, lng: 79.0900 }, type: 'commercial' },
      { name: 'Sadar', coordinates: { lat: 21.1600, lng: 79.0800 }, type: 'commercial' },
      { name: 'Manish Nagar', coordinates: { lat: 21.1000, lng: 79.1000 }, type: 'residential' },
      { name: 'Civil Lines', coordinates: { lat: 21.1600, lng: 79.0900 }, type: 'residential' },
      { name: 'MIHAN', coordinates: { lat: 21.0600, lng: 79.0700 }, type: 'industrial' },
      { name: 'Railway Station', coordinates: { lat: 21.1450, lng: 79.0900 }, type: 'transport' },
      { name: 'Wardha Road', coordinates: { lat: 21.1100, lng: 79.0800 }, type: 'commercial' },
      { name: 'Bardi', coordinates: { lat: 21.1500, lng: 79.0850 }, type: 'commercial' },
      { name: 'Ambazari Lake', coordinates: { lat: 21.1400, lng: 79.0600 }, type: 'public' }
    ]
  },
  'Agra': {
    name: 'Agra',
    coordinates: { lat: 27.1767, lng: 78.0081 },
    areas: [
      { name: 'Tajganj', coordinates: { lat: 27.1700, lng: 78.0300 }, type: 'public' },
      { name: 'Sadar Bazaar', coordinates: { lat: 27.1600, lng: 78.0200 }, type: 'commercial' },
      { name: 'Civil Lines', coordinates: { lat: 27.1900, lng: 78.0100 }, type: 'residential' },
      { name: 'Dayalbagh', coordinates: { lat: 27.2300, lng: 78.0100 }, type: 'residential' },
      { name: 'Sikandra', coordinates: { lat: 27.2300, lng: 77.9700 }, type: 'residential' },
      { name: 'Fatehabad Road', coordinates: { lat: 27.1600, lng: 78.0500 }, type: 'commercial' },
      { name: 'Agra Cantt', coordinates: { lat: 27.1500, lng: 78.0100 }, type: 'transport' },
      { name: 'Kamla Nagar', coordinates: { lat: 27.2100, lng: 78.0000 }, type: 'residential' },
      { name: 'Trans Yamuna', coordinates: { lat: 27.2000, lng: 78.0500 }, type: 'residential' },
      { name: 'Rakabganj', coordinates: { lat: 27.1700, lng: 78.0100 }, type: 'commercial' }
    ]
  },
  'Ludhiana': {
  name: 'Ludhiana',
  coordinates: { lat: 30.9010, lng: 75.8573 },
  areas: [
    { name: 'Model Town', coordinates: { lat: 30.9120, lng: 75.8469 }, type: 'residential' },
    { name: 'Civil Lines', coordinates: { lat: 30.9085, lng: 75.8480 }, type: 'residential' },
    { name: 'Ferozepur Road', coordinates: { lat: 30.9017, lng: 75.8224 }, type: 'commercial' },
    { name: 'Gill Road', coordinates: { lat: 30.8941, lng: 75.8702 }, type: 'commercial' },
    { name: 'Dugri', coordinates: { lat: 30.8842, lng: 75.8261 }, type: 'residential' },
    { name: 'Pakhowal Road', coordinates: { lat: 30.8855, lng: 75.8073 }, type: 'residential' },
    { name: 'Haibowal', coordinates: { lat: 30.9062, lng: 75.8243 }, type: 'residential' },
    { name: 'BRS Nagar', coordinates: { lat: 30.8895, lng: 75.8299 }, type: 'residential' },
    { name: 'Jagraon Bridge', coordinates: { lat: 30.9101, lng: 75.8487 }, type: 'commercial' },
    { name: 'Samrala Chowk', coordinates: { lat: 30.9139, lng: 75.8720 }, type: 'commercial' }
  ]
},

'Visakhapatnam': {
  name: 'Visakhapatnam',
  coordinates: { lat: 17.6868, lng: 83.2185 },
  areas: [
    { name: 'MVP Colony', coordinates: { lat: 17.7466, lng: 83.3363 }, type: 'residential' },
    { name: 'Gajuwaka', coordinates: { lat: 17.6824, lng: 83.2185 }, type: 'commercial' },
    { name: 'Dwaraka Nagar', coordinates: { lat: 17.7272, lng: 83.3076 }, type: 'commercial' },
    { name: 'Madhurawada', coordinates: { lat: 17.8301, lng: 83.3645 }, type: 'residential' },
    { name: 'Seethammadhara', coordinates: { lat: 17.7370, lng: 83.3125 }, type: 'residential' },
    { name: 'Beach Road', coordinates: { lat: 17.7138, lng: 83.3152 }, type: 'public' },
    { name: 'PM Palem', coordinates: { lat: 17.7860, lng: 83.3518 }, type: 'residential' },
    { name: 'Pedda Waltair', coordinates: { lat: 17.7213, lng: 83.3327 }, type: 'residential' },
    { name: 'Simhachalam', coordinates: { lat: 17.7680, lng: 83.2551 }, type: 'public' },
    { name: 'Chinna Waltair', coordinates: { lat: 17.7174, lng: 83.3299 }, type: 'residential' }
  ]
},

'Indore': {
  name: 'Indore',
  coordinates: { lat: 22.7196, lng: 75.8577 },
  areas: [
    { name: 'Vijay Nagar', coordinates: { lat: 22.7516, lng: 75.8962 }, type: 'commercial' },
    { name: 'Palasia', coordinates: { lat: 22.7177, lng: 75.8880 }, type: 'commercial' },
    { name: 'Rau', coordinates: { lat: 22.6454, lng: 75.8087 }, type: 'residential' },
    { name: 'Rajendra Nagar', coordinates: { lat: 22.6885, lng: 75.8402 }, type: 'residential' },
    { name: 'Bhawarkuan', coordinates: { lat: 22.7025, lng: 75.8701 }, type: 'residential' },
    { name: 'Annapurna', coordinates: { lat: 22.6941, lng: 75.8589 }, type: 'commercial' },
    { name: 'LIG Colony', coordinates: { lat: 22.7308, lng: 75.8805 }, type: 'residential' },
    { name: 'Mhow', coordinates: { lat: 22.5530, lng: 75.7608 }, type: 'residential' },
    { name: 'Khajrana', coordinates: { lat: 22.7253, lng: 75.9060 }, type: 'public' },
    { name: 'Tilak Nagar', coordinates: { lat: 22.7331, lng: 75.8901 }, type: 'residential' }
]
},

'Thane': {
  name: 'Thane',
  coordinates: { lat: 19.2183, lng: 72.9781 },
  areas: [
    { name: 'Ghodbunder Road', coordinates: { lat: 19.2726, lng: 72.9724 }, type: 'commercial' },
    { name: 'Naupada', coordinates: { lat: 19.1935, lng: 72.9729 }, type: 'residential' },
    { name: 'Majiwada', coordinates: { lat: 19.2045, lng: 72.9831 }, type: 'residential' },
    { name: 'Wagle Estate', coordinates: { lat: 19.2059, lng: 72.9674 }, type: 'commercial' },
    { name: 'Kolshet', coordinates: { lat: 19.2545, lng: 72.9778 }, type: 'residential' },
    { name: 'Manpada', coordinates: { lat: 19.2433, lng: 72.9787 }, type: 'residential' },
    { name: 'Vartak Nagar', coordinates: { lat: 19.2077, lng: 72.9631 }, type: 'residential' },
    { name: 'Kalwa', coordinates: { lat: 19.1937, lng: 73.0087 }, type: 'residential' },
    { name: 'Balkum', coordinates: { lat: 19.2215, lng: 72.9780 }, type: 'residential' },
    { name: 'Pokhran Road', coordinates: { lat: 19.2241, lng: 72.9665 }, type: 'commercial' }
]
},

'Ghaziabad': {
  name: 'Ghaziabad',
  coordinates: { lat: 28.6692, lng: 77.4538 },
  areas: [
    { name: 'Indirapuram', coordinates: { lat: 28.6411, lng: 77.3735 }, type: 'residential' },
    { name: 'Kaushambi', coordinates: { lat: 28.6438, lng: 77.3247 }, type: 'residential' },
    { name: 'Raj Nagar', coordinates: { lat: 28.6745, lng: 77.4449 }, type: 'residential' },
    { name: 'Vasundhara', coordinates: { lat: 28.6604, lng: 77.3799 }, type: 'residential' },
    { name: 'Crossings Republik', coordinates: { lat: 28.6271, lng: 77.4372 }, type: 'residential' },
    { name: 'Mohan Nagar', coordinates: { lat: 28.6460, lng: 77.3479 }, type: 'commercial' },
    { name: 'Loni', coordinates: { lat: 28.7544, lng: 77.2908 }, type: 'residential' },
    { name: 'Nehru Nagar', coordinates: { lat: 28.6752, lng: 77.4377 }, type: 'residential' },
    { name: 'Shalimar Garden', coordinates: { lat: 28.6750, lng: 77.3332 }, type: 'residential' },
    { name: 'Muradnagar', coordinates: { lat: 28.7779, lng: 77.4982 }, type: 'commercial' }
]
},
'Patna': {
  name: 'Patna',
  coordinates: { lat: 25.5941, lng: 85.1376 },
  areas: [
    { name: 'Kankarbagh', coordinates: { lat: 25.5949, lng: 85.1220 }, type: 'residential' },
    { name: 'Rajbanshi Nagar', coordinates: { lat: 25.6171, lng: 85.1418 }, type: 'residential' },
    { name: 'Patna City', coordinates: { lat: 25.5880, lng: 85.1362 }, type: 'commercial' },
    { name: 'Boring Road', coordinates: { lat: 25.6095, lng: 85.1375 }, type: 'commercial' },
    { name: 'Gandhi Maidan', coordinates: { lat: 25.6146, lng: 85.1448 }, type: 'public' },
    { name: 'Patliputra Colony', coordinates: { lat: 25.5785, lng: 85.0922 }, type: 'residential' },
    { name: 'Danapur', coordinates: { lat: 25.5847, lng: 85.0115 }, type: 'residential' },
    { name: 'Rajendra Nagar', coordinates: { lat: 25.5943, lng: 85.1095 }, type: 'residential' },
    { name: 'Patna Junction', coordinates: { lat: 25.6093, lng: 85.1233 }, type: 'transport' },
    { name: 'Kumhrar', coordinates: { lat: 25.5981, lng: 85.1255 }, type: 'public' }
  ]
},

'Bhopal': {
  name: 'Bhopal',
  coordinates: { lat: 23.2599, lng: 77.4126 },
  areas: [
    { name: 'Bairagarh', coordinates: { lat: 23.2702, lng: 77.3792 }, type: 'residential' },
    { name: 'MP Nagar', coordinates: { lat: 23.2520, lng: 77.4125 }, type: 'commercial' },
    { name: 'Arera Colony', coordinates: { lat: 23.2291, lng: 77.4185 }, type: 'residential' },
    { name: 'Kolar Road', coordinates: { lat: 23.2743, lng: 77.4608 }, type: 'residential' },
    { name: 'Habibganj', coordinates: { lat: 23.2020, lng: 77.4123 }, type: 'transport' },
    { name: 'Bittan Market', coordinates: { lat: 23.2651, lng: 77.4105 }, type: 'commercial' },
    { name: 'Shahpura', coordinates: { lat: 23.2730, lng: 77.4309 }, type: 'residential' },
    { name: 'Ankurhata', coordinates: { lat: 23.2645, lng: 77.4002 }, type: 'residential' },
    { name: 'Iqbal Nagar', coordinates: { lat: 23.2470, lng: 77.4021 }, type: 'residential' },
    { name: 'Bhopal Junction', coordinates: { lat: 23.2590, lng: 77.4060 }, type: 'transport' }
  ]
},

'Meerut': {
  name: 'Meerut',
  coordinates: { lat: 28.9845, lng: 77.7064 },
  areas: [
    { name: 'Meerut Cantt', coordinates: { lat: 28.9905, lng: 77.7080 }, type: 'transport' },
    { name: 'Shastri Nagar', coordinates: { lat: 28.9803, lng: 77.7065 }, type: 'residential' },
    { name: 'Civil Lines', coordinates: { lat: 28.9910, lng: 77.7032 }, type: 'residential' },
    { name: 'Begum Bridge', coordinates: { lat: 28.9850, lng: 77.7100 }, type: 'commercial' },
    { name: 'Meerut City', coordinates: { lat: 28.9840, lng: 77.7030 }, type: 'commercial' },
    { name: 'Modipuram', coordinates: { lat: 29.0184, lng: 77.6837 }, type: 'residential' },
    { name: 'Garh Road', coordinates: { lat: 28.9865, lng: 77.7012 }, type: 'residential' },
    { name: 'Shahganj', coordinates: { lat: 28.9832, lng: 77.7090 }, type: 'residential' },
    { name: 'Sadar Bazaar', coordinates: { lat: 28.9877, lng: 77.7044 }, type: 'commercial' },
    { name: 'Lal Kurti', coordinates: { lat: 28.9885, lng: 77.7065 }, type: 'residential' }
  ]
},

'Srinagar': {
  name: 'Srinagar',
  coordinates: { lat: 34.0837, lng: 74.7973 },
  areas: [
    { name: 'Lal Chowk', coordinates: { lat: 34.0701, lng: 74.8075 }, type: 'commercial' },
    { name: 'Rajbagh', coordinates: { lat: 34.0754, lng: 74.8062 }, type: 'residential' },
    { name: 'Ganderbal', coordinates: { lat: 34.2294, lng: 74.7761 }, type: 'residential' },
    { name: 'Nawakadal', coordinates: { lat: 34.0790, lng: 74.8050 }, type: 'residential' },
    { name: 'Srinagar Airport', coordinates: { lat: 33.9870, lng: 74.7745 }, type: 'transport' },
    { name: 'Badamwari', coordinates: { lat: 34.0901, lng: 74.8059 }, type: 'residential' },
    { name: 'Sonwar', coordinates: { lat: 34.0851, lng: 74.7812 }, type: 'residential' },
    { name: 'Habba Kadal', coordinates: { lat: 34.0865, lng: 74.8010 }, type: 'residential' },
    { name: 'Nigeen', coordinates: { lat: 34.0985, lng: 74.7690 }, type: 'public' },
    { name: 'Soura', coordinates: { lat: 34.0930, lng: 74.7870 }, type: 'residential' }
  ]
},

'Nashik': {
  name: 'Nashik',
  coordinates: { lat: 19.9975, lng: 73.7898 },
  areas: [
    { name: 'Panchavati', coordinates: { lat: 19.9960, lng: 73.7850 }, type: 'residential' },
    { name: 'College Road', coordinates: { lat: 19.9985, lng: 73.7890 }, type: 'commercial' },
    { name: 'Makhmalabad', coordinates: { lat: 19.9900, lng: 73.7800 }, type: 'residential' },
    { name: 'Indira Nagar', coordinates: { lat: 20.0002, lng: 73.7950 }, type: 'residential' },
    { name: 'Sitladevi', coordinates: { lat: 19.9955, lng: 73.7905 }, type: 'commercial' },
    { name: 'Gangapur Road', coordinates: { lat: 19.9800, lng: 73.8200 }, type: 'residential' },
    { name: 'Deolali', coordinates: { lat: 20.0050, lng: 73.8100 }, type: 'residential' },
    { name: 'Trimbak Road', coordinates: { lat: 20.0120, lng: 73.7900 }, type: 'residential' },
    { name: 'Satpur', coordinates: { lat: 20.0100, lng: 73.7800 }, type: 'commercial' },
    { name: 'Mhasrul', coordinates: { lat: 19.9950, lng: 73.8000 }, type: 'residential' }
  ]
},
'Vasai': {
  name: 'Vasai',
  coordinates: { lat: 19.3910, lng: 72.8397 },
  areas: [
    { name: 'Vasai West', coordinates: { lat: 19.3971, lng: 72.8263 }, type: 'residential' },
    { name: 'Vasai East', coordinates: { lat: 19.3850, lng: 72.8512 }, type: 'residential' },
    { name: 'Nalasopara', coordinates: { lat: 19.3996, lng: 72.8001 }, type: 'residential' },
    { name: 'Virar', coordinates: { lat: 19.4760, lng: 72.8089 }, type: 'residential' },
    { name: 'Dahisar', coordinates: { lat: 19.2414, lng: 72.8566 }, type: 'residential' },
    { name: 'Palghar Road', coordinates: { lat: 19.4542, lng: 72.7803 }, type: 'commercial' },
    { name: 'Vasai Fort', coordinates: { lat: 19.3908, lng: 72.8140 }, type: 'public' },
    { name: 'Kaman', coordinates: { lat: 19.3671, lng: 72.8500 }, type: 'residential' },
    { name: 'Bhivpuri', coordinates: { lat: 19.3877, lng: 72.8812 }, type: 'residential' },
    { name: 'Madhuban', coordinates: { lat: 19.3934, lng: 72.8415 }, type: 'residential' }
  ]
},

'Varanasi': {
  name: 'Varanasi',
  coordinates: { lat: 25.3176, lng: 82.9739 },
  areas: [
    { name: 'Dashashwamedh Ghat', coordinates: { lat: 25.3140, lng: 82.9881 }, type: 'public' },
    { name: 'Godowlia', coordinates: { lat: 25.3178, lng: 82.9875 }, type: 'commercial' },
    { name: 'Lanka', coordinates: { lat: 25.3134, lng: 82.9609 }, type: 'residential' },
    { name: 'Sigra', coordinates: { lat: 25.3201, lng: 82.9870 }, type: 'residential' },
    { name: 'Bhelupur', coordinates: { lat: 25.3251, lng: 82.9810 }, type: 'residential' },
    { name: 'Chowk', coordinates: { lat: 25.3160, lng: 82.9863 }, type: 'commercial' },
    { name: 'Rathyatra', coordinates: { lat: 25.3192, lng: 82.9740 }, type: 'public' },
    { name: 'Kedar Ghat', coordinates: { lat: 25.3204, lng: 82.9901 }, type: 'public' },
    { name: 'Kashi Vishwanath', coordinates: { lat: 25.3100, lng: 82.9935 }, type: 'public' },
    { name: 'Vijayanagar', coordinates: { lat: 25.3301, lng: 82.9750 }, type: 'residential' }
  ]
},

'Kalyan': {
  name: 'Kalyan',
  coordinates: { lat: 19.2403, lng: 73.1307 },
  areas: [
    { name: 'Kalyan West', coordinates: { lat: 19.2415, lng: 73.1278 }, type: 'residential' },
    { name: 'Kalyan East', coordinates: { lat: 19.2389, lng: 73.1330 }, type: 'residential' },
    { name: 'Shilphata', coordinates: { lat: 19.2304, lng: 73.1262 }, type: 'residential' },
    { name: 'Titwala', coordinates: { lat: 19.2731, lng: 73.2195 }, type: 'residential' },
    { name: 'Ulhasnagar', coordinates: { lat: 19.2182, lng: 73.1507 }, type: 'residential' },
    { name: 'Dombivli', coordinates: { lat: 19.2169, lng: 73.0904 }, type: 'residential' },
    { name: 'Shivaji Nagar', coordinates: { lat: 19.2447, lng: 73.1299 }, type: 'residential' },
    { name: 'Murbad Road', coordinates: { lat: 19.2551, lng: 73.1456 }, type: 'commercial' },
    { name: 'Kopri', coordinates: { lat: 19.2305, lng: 73.1350 }, type: 'residential' },
    { name: 'Kelkar Nagar', coordinates: { lat: 19.2381, lng: 73.1257 }, type: 'residential' }
  ]
},

'Faridabad': {
  name: 'Faridabad',
  coordinates: { lat: 28.4089, lng: 77.3178 },
  areas: [
    { name: 'Ballabhgarh', coordinates: { lat: 28.4045, lng: 77.3270 }, type: 'residential' },
    { name: 'NIT Faridabad', coordinates: { lat: 28.3870, lng: 77.3182 }, type: 'residential' },
    { name: 'Old Faridabad', coordinates: { lat: 28.4102, lng: 77.3151 }, type: 'commercial' },
    { name: 'Sector 15', coordinates: { lat: 28.4230, lng: 77.3041 }, type: 'residential' },
    { name: 'Sector 16', coordinates: { lat: 28.4261, lng: 77.3083 }, type: 'residential' },
    { name: 'Sector 21', coordinates: { lat: 28.4423, lng: 77.3109 }, type: 'residential' },
    { name: 'Sector 37', coordinates: { lat: 28.4560, lng: 77.3194 }, type: 'residential' },
    { name: 'Sector 28', coordinates: { lat: 28.4491, lng: 77.3210 }, type: 'residential' },
    { name: 'Sector 29', coordinates: { lat: 28.4612, lng: 77.3251 }, type: 'residential' },
    { name: 'Sector 12', coordinates: { lat: 28.4305, lng: 77.3170 }, type: 'residential' }
  ]
},

'Rajkot': {
  name: 'Rajkot',
  coordinates: { lat: 22.3039, lng: 70.8022 },
  areas: [
    { name: 'Rajkot Railway Station', coordinates: { lat: 22.3030, lng: 70.8025 }, type: 'transport' },
    { name: 'Race Course', coordinates: { lat: 22.3045, lng: 70.8050 }, type: 'commercial' },
    { name: 'Jubilee Garden', coordinates: { lat: 22.3057, lng: 70.8032 }, type: 'residential' },
    { name: 'Bhaktinagar', coordinates: { lat: 22.3065, lng: 70.8071 }, type: 'residential' },
    { name: 'Kalawad Road', coordinates: { lat: 22.3019, lng: 70.8003 }, type: 'commercial' },
    { name: 'Rajpath', coordinates: { lat: 22.3002, lng: 70.8057 }, type: 'residential' },
    { name: 'Vallabh Nagar', coordinates: { lat: 22.3085, lng: 70.8101 }, type: 'residential' },
    { name: 'B/h Amba Plaza', coordinates: { lat: 22.3028, lng: 70.8040 }, type: 'commercial' },
    { name: 'Rander Road', coordinates: { lat: 22.3091, lng: 70.7995 }, type: 'residential' },
    { name: 'Gondal Road', coordinates: { lat: 22.3112, lng: 70.8033 }, type: 'commercial' }
  ]
}

  

}

export function getCityLocation(cityName: string): CityLocation | null {
  return cityLocations[cityName] || null
}

export function getRandomAreaForCity(cityName: string): { name: string; coordinates: { lat: number; lng: number }; type: string } | null {
  const city = getCityLocation(cityName)
  if (!city || city.areas.length === 0) return null
  
  const randomIndex = Math.floor(Math.random() * city.areas.length)
  return city.areas[randomIndex]
}
