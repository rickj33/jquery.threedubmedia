;(function(){
	
	module("Touch Interaction");

	if ( !document.createEvent ){
		test("Touch Simulation Not Supported",function(){
			ok( true, 'This browser does not support "document.createEvent" and cannot simulate touch events.');	
		});
		return;
	}

	// a simple re-usable test harness object
	var obj = {
		init: function( opts ){
			obj.$div = 	$('<div />')
				.css({
					position: 'absolute',
					top: 0,
					left: 0,
					height: 100,
					width: 100
				})
				.append('<div class="child" />')
				.appendTo( document.body )
				.bind("draginit dragstart drag dragend click", opts || {}, function( event ){
					obj[ event.type ] += 1;					
				});
			$.extend( obj, { draginit:0, dragstart:0, drag:0, dragend:0, click:0 });
		},
		done: function(){
			obj.$div.remove();
			start();
		}
	};

	asyncTest("default",function(){
		expect( 5 );
		// prep DEFAULT interaction
		obj.init();
		// simulate DEFAULT interaction
		obj.$div
			.fire("touchstart",{ pageX:50, pageY:50 })
			.fire("touchmove",{ pageX:51, pageY:51 })
			.fire("touchend",{ pageX:51, pageY:51 })
			.fire("click");
		// inspect results	
		equal( obj.draginit, 1, "draginit");
		equal( obj.dragstart, 1, "dragstart");
		equal( obj.drag, 1, "drag");
		equal( obj.dragend, 1, "dragend");
		equal( obj.click, 0, "click");
		// clean-up interaction
		obj.done();
	});

	asyncTest('"not" option',function(){
		expect( 10 );
		// prep interaction
		obj.init({ not:'.child' });
		// simulate NOT interaction
		obj.$div.children()
			.fire("touchstart",{ pageX:50, pageY:50 })
			.fire("touchmove",{ pageX:51, pageY:51 })
			.fire("touchend",{ pageX:51, pageY:51 })
			.fire("click");
		// inspect results		
		equal( obj.draginit, 0, "draginit");
		equal( obj.dragstart, 0, "dragstart");
		equal( obj.drag, 0, "drag");
		equal( obj.dragend, 0, "dragend");
		equal( obj.click, 1, "click");
		// simlate NON NOT interaction
		obj.$div
			.fire("touchstart",{ pageX:50, pageY:50 })
			.fire("touchmove",{ pageX:51, pageY:51 })
			.fire("touchend",{ pageX:51, pageY:51 })
			.fire("click");
		// inspect results		
		equal( obj.draginit, 1, "draginit");
		equal( obj.dragstart, 1, "dragstart");
		equal( obj.drag, 1, "drag");
		equal( obj.dragend, 1, "dragend");
		equal( obj.click, 1, "click");
		// clean-up interaction
		obj.done();
	});

	asyncTest('"handle" option',function(){
		expect( 10 );
		// prep interaction
		obj.init({ handle:'.child' });
		// simulate HANDLE interaction
		obj.$div.children()
			.fire("touchstart",{ pageX:50, pageY:50 })
			.fire("touchmove",{ pageX:51, pageY:51 })
			.fire("touchend",{ pageX:51, pageY:51 })
			.fire("click");
		// inspect results		
		equal( obj.draginit, 1, "draginit");
		equal( obj.dragstart, 1, "dragstart");
		equal( obj.drag, 1, "drag");
		equal( obj.dragend, 1, "dragend");
		equal( obj.click, 0, "click");	
		// simulate NON HANDLE interaction
		obj.$div
			.fire("touchstart",{ pageX:50, pageY:50 })
			.fire("touchmove",{ pageX:51, pageY:51 })
			.fire("touchend",{ pageX:51, pageY:51 })
			.fire("click");
		// inspect results		
		equal( obj.draginit, 1, "draginit");
		equal( obj.dragstart, 1, "dragstart");
		equal( obj.drag, 1, "drag");
		equal( obj.dragend, 1, "dragend");
		equal( obj.click, 1, "click");
		// clean-up interaction
		obj.done();
	});
	
	asyncTest('"which" option',function(){
		expect( 11 );
		// prep interaction
		obj.init({ which:0 });
		// simulate WHICH interaction
		obj.$div
			.fire("touchstart",{ pageX:50, pageY:50, button:5 })
			.fire("touchmove",{ pageX:51, pageY:51 })
			.fire("touchend",{ pageX:51, pageY:51 })
			.fire("click");
		// inspect results
		equal( obj.draginit, 1, "draginit");
		equal( obj.dragstart, 1, "dragstart");
		equal( obj.drag, 1, "drag");
		equal( obj.dragend, 1, "dragend");
		equal( obj.click, 0, "click");	
		ok( true, '"which" not supported with touch events...');
		// simulate NON WHICH interaction
		obj.$div
			.fire("touchstart",{ pageX:50, pageY:50 })
			.fire("touchmove",{ pageX:51, pageY:51 })
			.fire("touchend",{ pageX:51, pageY:51 })
			.fire("click");
		// inspect results
		equal( obj.draginit, 2, "draginit");
		equal( obj.dragstart, 2, "dragstart");
		equal( obj.drag, 2, "drag");
		equal( obj.dragend, 2, "dragend");
		equal( obj.click, 0, "click");
		// clean-up interaction
		obj.done();
	});	

	asyncTest('"distance" option',function(){
		expect( 10 );
		// prep interaction
		obj.init({ distance:5 });
		// simulate NON DISTANCE interaction
		obj.$div
			.fire("touchstart",{ pageX:50, pageY:50 })
			.fire("touchmove",{ pageX:51, pageY:51 })
			.fire("touchend",{ pageX:51, pageY:51 })
			.fire("click");
		// inspect results		
		equal( obj.draginit, 1, "draginit");
		equal( obj.dragstart, 0, "dragstart");
		equal( obj.drag, 0, "drag");
		equal( obj.dragend, 0, "dragend");
		equal( obj.click, 1, "click");	
		// simulate DISTANCE interaction
		obj.$div
			.fire("touchstart",{ pageX:50, pageY:50 })
			.fire("touchmove",{ pageX:53, pageY:54 })
			.fire("touchend",{ pageX:53, pageY:54 })
			.fire("click");
		// inspect results		
		equal( obj.draginit, 2, "draginit");
		equal( obj.dragstart, 1, "dragstart");
		equal( obj.drag, 1, "drag");
		equal( obj.dragend, 1, "dragend");
		equal( obj.click, 1, "click");
		// clean-up interaction
		obj.done();
	});


	asyncTest('"click" option',function(){
		expect( 5 );
		// prep interaction
		obj.init({ click:true });
		// simulate CLICK interaction
		obj.$div
			.fire("touchstart",{ pageX:50, pageY:50 })
			.fire("touchmove",{ pageX:51, pageY:51 })
			.fire("touchend",{ pageX:51, pageY:51 })
			.fire("click");
		// inspect results	
		equal( obj.draginit, 1, "draginit");
		equal( obj.dragstart, 1, "dragstart");
		equal( obj.drag, 1, "drag");
		equal( obj.dragend, 1, "dragend");
		equal( obj.click, 1, "click");	
		// clean-up interaction
		obj.done();
	});

})();