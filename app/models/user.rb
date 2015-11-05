class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_one :free_time, dependent: :destroy
  has_many :work_relax_buttons, dependent: :destroy
  has_many :records, dependent: :destroy
end
