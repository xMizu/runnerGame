class PlayersController < ApplicationController
  def index
    players = Player.order(score: :desc).limit(3)

    render json: players
  end
  
  def create
    player = Player.create(player_params)
    
    render json: player
  end
  private
  def player_params
    params.require(:player).permit(:name, :score)
  end
end
