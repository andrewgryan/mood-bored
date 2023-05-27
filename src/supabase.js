import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Supabase
const supabase = createClient(
  "https://hfpveiuswfubfyhormqh.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmcHZlaXVzd2Z1YmZ5aG9ybXFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODUxMDM5NDIsImV4cCI6MjAwMDY3OTk0Mn0.b17qlodnbhIcZ8SzC_oUkWmJUL8tFUn6alZOnLWf7MM"
);

export default supabase;
