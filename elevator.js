{
    init: function(elevators, floors) {
        var called = [];
        var elevator = elevators[0]; // Let's use the first elevator
        elevator.destinationQueue = [];

        elevator.on("idle", function() {
            // The elevator is idle, so let's go to all the floors (or did we forget one?)
            console.log('is idle');
              elevator.stop();
            //elevator.goToFloor(0);
            elevator.checkDestinationQueue();
            //console.log('going to floor 0');
        });
        elevator.on("floor_button_pressed", function(floorNum) {
            console.log('going to '+floorNum);
            console.log('current floor '+elevator.currentFloor());
            if(elevator.loadFactor() < 0.2) {
              console.log(elevator.destinationQueue);
              console.log('load factor under 20%')
                // Maybe use this elevator, since it's not full yet?

              elevator.goToFloor(floorNum);
            } else {
              elevator.goToFloor(floorNum, true);
            }

        });
        for (var floorNum = 0; floorNum < floors.length; floorNum++) {
            var floor = floors[floorNum];
            floor.on("up_button_pressed", function() {
                // Maybe tell an elevator to go to this floor?

                if(elevator.loadFactor() < 0.2) {
                    // Maybe use this elevator, since it's not full yet?
                    elevator.stop();
                  elevator.goToFloor(floorNum, true);
                } else {
                  elevator.goToFloor(floorNum);
                }
                console.log(elevator.destinationQueue);
            });

            floor.on("down_button_pressed", function() {
                // Maybe tell an elevator to go to this floor?
                if(elevator.loadFactor() < 0.2) {
                    // Maybe use this elevator, since it's not full yet?
                    elevator.stop();
                  elevator.goToFloor(floorNum, true);
                } else {
                  elevator.goToFloor(floorNum);
                }
            });
        }
    },
        update: function(dt, elevators, floors) {
            // We normally don't need to do anything here
        }
}
