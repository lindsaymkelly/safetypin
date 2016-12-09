class User < ApplicationRecord
  has_secure_password

  validates :email, uniqueness: true, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i }, presence: true
  validates :password, length: { minimum: 8, maximum: 100 }
  validates :name, presence: true
  validates :city, presence: true
end
