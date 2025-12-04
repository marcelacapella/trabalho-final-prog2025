import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const SUPABASE_URL ='https://dsugctfsikpmfuyynjpg.supabase.co';
const SUPABASE_KEY= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzdWdjdGZzaWtwbWZ1eXluanBnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwNDQwMDMsImV4cCI6MjA3ODYyMDAwM30.0V7P2C5mIq7JXN_iJtuy6ocgAtJ0zB3qtrOnBoo4kYo';


export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);