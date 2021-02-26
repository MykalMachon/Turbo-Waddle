import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://fpmmtecsjongwpkqmmux.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNDIxNDAyNCwiZXhwIjoxOTI5NzkwMDI0fQ.yFC9kPWHO32vhlWWBCXR8TVnia__AGP3y_Neg4De7ns'
);
