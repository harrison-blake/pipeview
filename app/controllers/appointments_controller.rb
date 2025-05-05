class AppointmentsController < ApplicationController
	def new
  		@appointment = Appointment.new
  		@slots_by_day = generate_slots_by_day(Date.current, 3.months.from_now.to_date)
	end

	def create
    	@appointment = Appointment.new(appointment_params)

    	if @appointment.save
      		flash[:notice] = "Thanks #{@appointment.name}! Your inspection is booked for #{@appointment.preferred_time.strftime('%A, %B %e at %l:%M %p')}."
      		redirect_to root_path
    	else
      		flash.now[:alert] = "Please fix the errors below."
      		@slots_by_day = generate_slots_by_day(Date.current, 3.months.from_now.to_date)
      		render :new
    	end
  	end

	private
	def appointment_params
    	params.require(:appointment).permit(:name, :email, :phone, :preferred_time)
  	end
	def generate_slots_by_day(start_date, end_date)
  		booked = Appointment.where(preferred_time: start_date.beginning_of_day..end_date.end_of_day).pluck(:preferred_time)

  		(start_date..end_date).each_with_object({}) do |day, hash|
    		hours = day.saturday? || day.sunday? ? 8..17 : 14..19
    		slots = hours.map { |h| Time.zone.local(day.year, day.month, day.day, h) }
    		available = slots.reject { |slot| booked.include?(slot) }
    		hash[day.to_s] = available.map(&:iso8601)
  		end
	end
end
