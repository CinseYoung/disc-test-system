-- ================================================
-- DISC 性格测试系统 - 数据库建表脚本
-- 在 Supabase Dashboard -> SQL Editor 中执行
-- ================================================

-- 创建 test_submissions 表
create table if not exists test_submissions (
  id uuid default gen_random_uuid() primary key,
  candidate_name text not null,
  answers jsonb not null,
  score_d integer not null default 0,
  score_i integer not null default 0,
  score_s integer not null default 0,
  score_c integer not null default 0,
  duration_seconds integer,
  created_at timestamptz default now()
);

-- 创建索引
create index if not exists idx_submissions_created_at on test_submissions (created_at desc);
create index if not exists idx_submissions_candidate_name on test_submissions using gin (candidate_name gin_trgm_ops);

-- 启用 RLS（行级安全策略）
alter table test_submissions enable row level security;

-- 策略：允许任何人插入（候选人提交答案）
create policy "Anyone can insert submissions"
  on test_submissions
  for insert
  to anon
  with check (true);

-- 策略：允许任何人查询（管理后台不需要登录）
create policy "Anyone can read submissions"
  on test_submissions
  for select
  to anon
  using (true);

-- 启用 Realtime（管理后台实时刷新需要）
alter publication supabase_realtime add table test_submissions;
