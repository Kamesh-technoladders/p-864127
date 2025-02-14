
insert into storage.buckets (id, name, public)
values ('bank-documents', 'bank-documents', true);

create policy "Bank documents are publicly accessible"
on storage.objects for select
using ( bucket_id = 'bank-documents' );

create policy "Users can upload bank documents"
on storage.objects for insert
with check ( bucket_id = 'bank-documents' );

create policy "Users can update their bank documents"
on storage.objects for update
with check ( bucket_id = 'bank-documents' );

create policy "Users can delete their bank documents"
on storage.objects for delete
using ( bucket_id = 'bank-documents' );
