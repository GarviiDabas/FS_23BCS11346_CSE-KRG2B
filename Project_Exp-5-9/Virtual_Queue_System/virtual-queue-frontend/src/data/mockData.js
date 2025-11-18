// This data is based on your PDF's database tables
export const MOCK_QUEUES = [
  { 
    queue_id: 1, 
    name: "Clinic OPD", 
    avg_service_time: 10, 
    current_token_number: 5, 
    is_active: true 
  },
  { 
    queue_id: 2, 
    name: "Pharmacy Counter", 
    avg_service_time: 3, 
    current_token_number: 45, 
    is_active: true 
  },
  { 
    queue_id: 3, 
    name: "Reports Collection", 
    avg_service_time: 2, 
    current_token_number: 12, 
    is_active: false 
  }
];

export const MOCK_MY_TOKEN = {
  token_id: 101,
  token_number: 10,
  queue_id: 1,
  queue_name: "Clinic OPD",
  current_serving: 5,
  status: "WAITING", 
  estimated_wait_time: 40 // (position 5 - 1) * avg_service_time 10
};