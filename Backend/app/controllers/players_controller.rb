class PlayersController < ApplicationController
  def index
    players = Player.all

    render json: players
  end
  
  def create
    player = player.create
    
    render json: player
  end
end
