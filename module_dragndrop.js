/** Тестировалось на библиотеки jQuery v3.2.1 */

// Включаем строгий режим
"use strict";



/**
 *	@version 1.0.0
 *	@author Leonid Petukhov
 */
(function($) {
	/** Имя модуля */
	var MODULE_NAME          = 'module_dragndrop';
	/** Версия модуля */
	var MODULE_VERSION       = '1.0.0';
	/** Автор модуля */
	var MODULE_AUTHOR        = 'Петухов Леонид';
	/** Дата релиза модуля */
	var MODULE_DATE          = '2021-10-18';
	/** Описание модуля */
	var MODULE_DESCRIPTION   = 'Перемещение элементов междк блоками.';


	/** Объект */
	var object_module = {};





	/** Добавляет класс наведения */
	function _add_class_box($target, $element) {
		var $side_html             = $target[0];
		var $element_parent_html   = $element.parent('[module_dragndrop__box]')[0];
		// Если водим над родителем, то выходим
		if ($side_html == $element_parent_html) { return ;}
		// Если нет, то подкрашиваем через класс
		var $side = $($target);
		$side.addClass('module_dragndrop__drop_catches');
	}


	/** Удаляет класс наведения */
	function _remove_class_box($target) {
		var $side = $($target);
		$side.removeClass('module_dragndrop__drop_catches');
	}



	/** Добавляет класс перемещения */
	function _add_class_card($element) {
		$element.addClass('module_dragndrop__drag_move');
	}



	/** Удаляет класс перемещения */
	function _remove_class_card($element) {
		$element.removeClass('module_dragndrop__drag_move');
	}



	/** Добавляет класс для helper */
	function _add_class_helper($element) {
		$element.addClass('module_dragndrop__drag_helper');
	}



	/** Перемещает элемент в другую зону */
	function _elem_move($element, $side) {
		if ($element.attr('module_dragndrop__card') === undefined) {return;}
		var $side_html             = $side[0];
		var $element_parent_html   = $element.parent('[module_dragndrop__box]')[0];
		if ($side_html != $element_parent_html) {
			$side.append($element);
		}
	}



	/** Активация модуля */
	object_module.start = function() {
		// Настройки области отлова элементов
		$('[module_dragndrop__box]').each(function() {
			var $obj = $(this);
			$obj.droppable({
				// При сбросе элемента на область
				drop: function(event, ui) {
					var $side      = $(event.target);
					var $element   = $(ui.draggable[0]);
					_elem_move($element, $side)
					_remove_class_box($side);
				},
				// При перетаскивании элемента на область
				over: function(event, ui) {
					var $side      = $(event.target);
					var $element   = $(ui.draggable[0]);
					_add_class_box($side, $element);
				},
				// При удалении элемента с область
				out: function(event, ui) {
					var $side      = $(event.target);
					var $element   = $(ui.draggable[0]);
					_remove_class_box($side);
				}
			});
			// Настройка доступности перемещения для зоны
			var $scope = $obj.attr('module_dragndrop__box');
			if ($scope.length) {
				$obj.droppable("option", "scope", $scope);
			}

		})
		// Настройки перебрасываемого элемента
		$("[module_dragndrop__card]").each(function() {
			var $obj = $(this);
			$obj.draggable({
				helper: 'clone',   // Работа с дубликатом элемента
				cursorAt: {cursor: "move", top: 20, left: 20},  // Захват объекта
				start: function(event, ui) {
					var $element   = $(event.target);
					_add_class_card($element)
					$element       = $(ui.helper);
					_add_class_helper($element)
				},
				stop: function(event, ui) {
					var $element   = $(event.target);
					_remove_class_card($element)
				}
			});/**/
			// Настройка доступности перемещения для элемента
			var $scope = $obj.attr('module_dragndrop__card');
			if ($scope.length) {
				$obj.draggable("option", "scope", $scope);
			}
		})
	};





	/** Возвращает объект с информацией о модуле */
	object_module.info = function() {
		return {
			module: MODULE_NAME,
			version: MODULE_VERSION,
			date: MODULE_DATE,
			author: MODULE_AUTHOR,
			description: MODULE_DESCRIPTION
		};
	};





	/** Выводит сообщение с информацией о модуле */
	object_module.about = function() {
		alert(MODULE_NAME + '\nВерсия: ' + MODULE_VERSION + '\nДата: ' + MODULE_DATE + '\nРазработчик: ' + MODULE_AUTHOR + '\n\n' + MODULE_DESCRIPTION);
	};





	window[MODULE_NAME] = object_module;

/**/
}(jQuery));
