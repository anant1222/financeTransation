# financeTransation

# server started on http://localhost:3030
# About:
         This project is about finance transation, there is two part, first one admin manage and users. here admin can create a user & then users can access the app, where users can deposit and credit the amount and also able to send to other user while sending to other user's admin can take 2% of commission of that amount.admin and users both are able to see the user's list and user's details, only admin admin can delete any users.
         
# dataBases: 
             Here, I have created 3 tables
             1. users: where we store users related data.
             # tables : {
             id,
             user_name,
             first_name,
             last_name,
             is_admin,
             created_at,
             updated_on
             }
             2. user_balanec : where we store users balance related data with version and last updation and created time.
              # tables : {
             user_id,
             total_balance,
             version,
             created_at,
             updated_on
             }
             3. users_transaction : where we store all information related to txn and txn history
             # tables : {
             id,
             from_user_id,
             to_user_id,
             amount,
             txn_type (CR,DR),
             refs_txn_id,
             created_at,
             updated_on
             }
