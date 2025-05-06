class Admin::SessionsController < ApplicationController
  layout "admin" # optional: use separate layout

  def new; end

  def create
    user = User.find_by(email: params[:email])

    if user&.authenticate(params[:password]) && user.admin?
      session[:admin_user_id] = user.id
      redirect_to admin_dashboard_path, notice: "Logged in as admin."
    else
      flash.now[:alert] = "Invalid credentials or not an admin"
      render :new
    end
  end

  def destroy
    session[:admin_user_id] = nil
    redirect_to admin_login_path, notice: "Logged out."
  end
end
