class ProjectsController < ApplicationController
  
  def create
    @session = Session.find(params[:session_id])
    @project = @session.projects.build(project_params)
    
    @project.save
  end


  def project_params
    params.require(:project).permit(:name)
  end
end
