
import { createClient } from '@supabase/supabase-js'

const supabaseUrl: string = 'https://ekasxqeexvjjtqgdhvxg.supabase.co';
const supabaseKey: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrYXN4cWVleHZqanRxZ2RodnhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU2MDk0OTYsImV4cCI6MjAzMTE4NTQ5Nn0.7QVtVHwLmxl34C2Yc9SmeLpPpJVNsTH174qH-1ZCeBE';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;