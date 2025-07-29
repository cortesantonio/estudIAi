import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xltjvdimmmqcnmbpqqie.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsdGp2ZGltbW1xY25tYnBxcWllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0MTEyOTgsImV4cCI6MjA2Njk4NzI5OH0.feUPxRXvg_38-kWNFX17XsMQcNNv5aXZDOApYj1I9zE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
