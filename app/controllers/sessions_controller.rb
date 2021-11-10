class SessionsController < ApplicationController
  def create
    @session = Session.create!(:name => 'New Session')
    redirect_to session_path(@session.slug)
  end

  def show
    @session = Session.find_by(slug: params[:id])
    @project = Project.new(session: @session)
    @projects = @session.projects

    @current_project = @projects.first || @session.projects.create(name: "First Project")
  end
end
