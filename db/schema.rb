# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_12_27_044620) do

  create_table "accounts", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["email"], name: "index_accounts_on_email", unique: true
    t.index ["reset_password_token"], name: "index_accounts_on_reset_password_token", unique: true
  end

  create_table "categories", primary_key: "category_id", id: { limit: 4 }, force: :cascade do |t|
    t.string "category_name", limit: 512, null: false
    t.string "deleted_flag", limit: 1
  end

  create_table "posts", primary_key: ["post_id", "category_id"], force: :cascade do |t|
    t.integer "post_id", limit: 4, null: false
    t.integer "category_id", limit: 4, null: false
    t.string "hide_flag", limit: 1
    t.string "ip", limit: 20, null: false
    t.string "name", limit: 256
    t.string "mail", limit: 256
    t.string "subject", limit: 256
    t.string "text", limit: 10000, null: false
    t.datetime "post_date", null: false
  end

end
