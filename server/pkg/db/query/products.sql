-- name: AddProduct :execresult
INSERT INTO user_item (
    user_id,item_id
) VALUES (
   ?, ?
);

