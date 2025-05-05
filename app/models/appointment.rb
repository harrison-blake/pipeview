class Appointment < ApplicationRecord
  validates :name, :email, :phone, :preferred_time, presence: true
end
