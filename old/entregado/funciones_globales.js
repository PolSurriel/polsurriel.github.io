
  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    UMI.setup();
    
  }

  
  function createEnemies() {
    enemies.push(new Enemy(150, 150));
    enemiesAway.push(new EnemyAway(-150, 150));

  }



  function generate_hexagon_reference(x, y, radius, npoints) {
    let angle = TWO_PI / npoints;
    
    var r = new Array();
    
    for (let a = 0; a < TWO_PI; a += angle) {
      r.push([
        x + cos(a) * radius,
        y + sin(a) * radius
      ]);
    }

    return r;

  }


