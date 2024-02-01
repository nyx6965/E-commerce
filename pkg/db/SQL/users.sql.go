// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.25.0
// source: users.sql

package db

import (
	"context"
	"database/sql"
)

const createUser = `-- name: CreateUser :execresult
INSERT INTO user (
    username, email, password
) VALUES (
    ?, ?, ?
)
`

type CreateUserParams struct {
	Username sql.NullString `json:"username"`
	Email    sql.NullString `json:"email"`
	Password sql.NullString `json:"password"`
}

func (q *Queries) CreateUser(ctx context.Context, arg CreateUserParams) (sql.Result, error) {
	return q.db.ExecContext(ctx, createUser, arg.Username, arg.Email, arg.Password)
}

const loginUser = `-- name: LoginUser :one
SELECT id, email, username, password, created_at FROM user
WHERE email = ?
`

func (q *Queries) LoginUser(ctx context.Context, email sql.NullString) (User, error) {
	row := q.db.QueryRowContext(ctx, loginUser, email)
	var i User
	err := row.Scan(
		&i.ID,
		&i.Email,
		&i.Username,
		&i.Password,
		&i.CreatedAt,
	)
	return i, err
}
