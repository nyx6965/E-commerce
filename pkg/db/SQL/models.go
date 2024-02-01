// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.25.0

package db

import (
	"database/sql"
)

type User struct {
	ID        int64          `json:"id"`
	Email     sql.NullString `json:"email"`
	Username  sql.NullString `json:"username"`
	Password  sql.NullString `json:"password"`
	CreatedAt sql.NullTime   `json:"created_at"`
}

type UserItem struct {
	ID      int64           `json:"id"`
	UserID  sql.NullInt64   `json:"user_id"`
	ItemID  sql.NullInt64   `json:"item_id"`
	Count   sql.NullInt64   `json:"count"`
	Name    sql.NullString  `json:"name"`
	Price   sql.NullFloat64 `json:"price"`
	About   sql.NullString  `json:"about"`
	Picture sql.NullString  `json:"picture"`
	FOREIGN interface{}     `json:"FOREIGN"`
}
