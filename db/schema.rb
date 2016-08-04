# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160804011311) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "nd_monthly_productions", force: :cascade do |t|
    t.integer  "nd_well_id"
    t.string   "pool"
    t.date     "date"
    t.integer  "bbls_oil"
    t.integer  "bbls_water"
    t.integer  "mcf_prod"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "nd_operators", force: :cascade do |t|
    t.string   "name"
    t.integer  "well_count"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "nd_wells", force: :cascade do |t|
    t.integer  "api_no",      limit: 8
    t.integer  "file_no"
    t.string   "operator"
    t.string   "well_name"
    t.date     "spud_date"
    t.integer  "td"
    t.string   "field_name"
    t.float    "latitude"
    t.float    "longitude"
    t.string   "well_type"
    t.string   "well_status"
    t.integer  "cum_oil"
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
  end

end
