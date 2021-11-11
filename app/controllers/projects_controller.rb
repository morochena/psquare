class ProjectsController < ApplicationController
  
  def create
    @session = Session.find(params[:session_id])
    @project = @session.projects.build(project_params)
    
    unless @project.name.blank?
      @project.save
    end
  end

  def update
    @project = Project.find(params[:id])
    @project.update!(project_params)
  end

  def destroy
    @project = Project.find(params[:id])
    @project.destroy
  end

  def project_params
    params.require(:project).permit(:name)
  end
end
