describe('player.services', function(){
  beforeEach(module('app'));

  describe('PlayerService', function(){
    it('should create a player', inject(function(PlayerService, Player){
      var player = new Player({
        name : 'sample player'
      });
      player = PlayerService.create(player);
      expect(player.id).toEqual(PlayerService.getAll().length);
    }));

    it('should not create a player without name', inject(function(PlayerService, Player){
      var player = new Player({});
      var expectedPlayers = PlayerService.getAll();
      var createdPlayer = PlayerService.create(player);
      var actualPlayers = PlayerService.getAll();
      expect(player).toEqual(createdPlayer);
      expect(expectedPlayers).toEqual(actualPlayers);
    }));

    it('should update a player that exists', inject(function(PlayerService, Player){
      var player = new Player({
        name : 'sample player'
      });
      player = PlayerService.create(player);
      player.name = 'modified player name';
      var modifiedPlayer = PlayerService.update(player);
      expect(player).toEqual(modifiedPlayer);
    }));

    it('should not update a player that does not exist', inject(function(PlayerService, Player){
      var player = new Player({
        name : 'sample player'
      });
      var players = PlayerService.getAll();
      PlayerService.update(player);
      var playersAfterUpdate = PlayerService.getAll();
      expect(playersAfterUpdate).toEqual(players);
    }));

    it('should delete a player', inject(function(PlayerService, Player){
      var player = new Player({
        name : 'sample player'
      });
      player = PlayerService.create(player);
      var players = PlayerService.getAll().length;
      PlayerService.delete(player.id);
      var actualPlayers = PlayerService.getAll().length;
      expect(players).toEqual(actualPlayers + 1);
    }));

    it('should delete nothing if the player does not exist', inject(function(PlayerService, Player){
      var players = PlayerService.getAll().length;
      PlayerService.delete(1234441);
      var actualPlayers = PlayerService.getAll().length;
      expect(players).toEqual(actualPlayers);
    }));

    it('should return a player by id', inject(function(PlayerService, Player){
      var player = new Player({
        name : 'sample player'
      });
      player = PlayerService.create(player);
      var actualPlayer = PlayerService.getById(player.id);
      expect(player).toEqual(actualPlayer);
    }));

    it('should return undefined if the player does not exist',inject(function(PlayerService, Player){
      var player = PlayerService.getById(12333);
      expect(player).toBeFalsy();
    }));

    it('should return all players', inject(function(PlayerService){
      expect(PlayerService.getAll().length).toEqual(3);
    }));

  });
});
