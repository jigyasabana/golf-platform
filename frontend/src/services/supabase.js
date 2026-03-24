import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://jhzzfwloillmvhnimiar.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impoenpmd2xvaWxsbXZobmltaWFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzNDQ1MTAsImV4cCI6MjA4OTkyMDUxMH0.CMDM09uzm88snOo84wMaqscLPOXp6Q5bHdlKEZMIm1M";

export const supabase = createClient(supabaseUrl, supabaseKey);