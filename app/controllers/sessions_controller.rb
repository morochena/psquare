class SessionsController < ApplicationController
  def create
    @session = Session.create!(session_params)
    redirect_to session_path(@session.slug)
  end

  def show
    @session = Session.find_by(slug: params[:id])
    @project = Project.new(session: @session)
    @projects = @session.projects.order(created_at: :asc).includes(:scores)

    @current_project = @projects.first
  end

  def update
    @session = Session.find(params[:id])
    @session.update!(session_params)
  end

  def session_params
    params.require(:session).permit(:name)
  end
end
