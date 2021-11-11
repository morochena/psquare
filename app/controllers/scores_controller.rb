class ScoresController < ApplicationController
 
  def create
    puts params
    @project = Project.find(params[:project_id])
    @score = @project.scores.find_by(uuid: score_params[:uuid])
    
    if @score
      @score.update(score_params)
    else
      @score = @project.scores.create(score_params)
    end
  end

  def score_params
    params.require(:score).permit(:impact_score, :effort_score, :username, :uuid)
  end
end