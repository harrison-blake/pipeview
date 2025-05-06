class Admin::BaseController < ApplicationController
  before_action :require_admin!

  private
  def current_admin
    @current_admin ||= User.find_by(id: session[:admin_user_id])
  end
  
  helper_method :current_admin

  def require_admin!
    redirect_to admin_login_path unless current_admin&.admin?
  end
end
