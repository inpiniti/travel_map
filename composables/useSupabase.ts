import { createClient } from "@supabase/supabase-js";
const project = "znxfbyvsoxbnozeeiclh";
const anonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpueGZieXZzb3hibm96ZWVpY2xoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMzNzE0MzAsImV4cCI6MjAzODk0NzQzMH0.DcnrrhcegIHoeR29nP5y5BQL20fuhW3dRBlLwijD87c";

export const useSupabase = () =>
  createClient(`https://${project}.supabase.co`, anonKey);
