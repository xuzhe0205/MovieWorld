define([
  'jquery',
  'lodash',
], function($, _) {


  const initDynamic = function() {
    const header = $('[data-sample-request-header-name]');

    for (let i = 0; i < header.length; i++) {
      if ($(header[i]).attr('data-sample-request-header-name') == 'mw-token') {
        $(header[i]).val('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNWJmZTVjYjJmNTMxNDg2YTEzMDMwMDk1IiwiZXhwIjoxNTQ0MDAyOTA4LCJpYXQiOjE1NDMzOTgxMDh9.AXmo5L9FROPdrvu_bQB2mx5r3BtJ4KKkgDz2WRKnDVU');
      } 
    }
    // Button send
    $('.sample-request-send').off('click');
    $('.sample-request-send').on('click', function(e) {
      e.preventDefault();
      const $root = $(this).parents('article');
      const group = $root.data('group');
      const name = $root.data('name');
      const version = $root.data('version');
      const contentType = $root.data('contenttype');
      sendSampleRequest(group, name, version, $(this).data('sample-request-type'), contentType);
    });

    // Button clear
    $('.sample-request-clear').off('click');
    $('.sample-request-clear').on('click', function(e) {
      e.preventDefault();
      const $root = $(this).parents('article');
      const group = $root.data('group');
      const name = $root.data('name');
      const version = $root.data('version');
      clearSampleRequest(group, name, version);
    });
  }; // initDynamic

  function sendSampleRequest(group, name, version, type, contentType) {

    const $root = $('article[data-group="' + group + '"][data-name="' + name + '"][data-version="' + version + '"]');

    // Optional header
    const header = {};
    $root.find('.sample-request-header:checked').each(function(i, element) {
      const group = $(element).data('sample-request-header-group-id');
      $root.find('[data-sample-request-header-group="' + group + '"]').each(function(i, element) {
        const key = $(element).data('sample-request-header-name');
        let value = element.value;
        if (!element.optional && element.defaultValue !== '') {
          value = element.defaultValue;
        }
        header[key] = value;
      });
    });

    // create JSON dictionary of parameters
    let param = {};
    const paramType = {};
    $root.find('.sample-request-param:checked').each(function(i, element) {
      const group = $(element).data('sample-request-param-group-id');
      $root.find('[data-sample-request-param-group="' + group + '"]').each(function(i, element) {
        const key = $(element).data('sample-request-param-name');
        let value = element.value;

        // Fix the problem of taking the default value
        // if (!element.optional && element.defaultValue !== '') {
        //     value = element.defaultValue;
        // }

        if (value == '' && element.defaultValue) {
          value = element.defaultValue;
        }

        // Fix if the value is empty, it will not be copied
        if (value != '') {
          param[key] = value;
        }

        paramType[key] = $(element).next().text();
      });
    });

    // grab user-inputted URL
    let url = $root.find('.sample-request-url').val();

    // Insert url parameter
    const pattern = pathToRegexp(url, null);
    const matches = pattern.exec(url);
    for (let i = 1; i < matches.length; i++) {
      const key = matches[i].substr(1);
      if (param[key] !== undefined) {
        url = url.replace(matches[i], encodeURIComponent(param[key]));

        // remove URL parameters from list
        delete param[key];
      }
    } // for

    $root.find('.sample-request-response').fadeTo(250, 1);
    $root.find('.sample-request-response-json').html('Loading...');
    refreshScrollSpy();


    if (!contentType && header['Content-Type']) {
      contentType = header['Content-Type'];
    } else if (!contentType) {
      // default
      contentType = 'application/x-www-form-urlencoded; charset=UTF-8';
    }
    header['Content-Type'] = contentType;
    if (contentType == 'application/json') {
      param = JSON.stringify(param);
    } else {
      _.each(param, function(val, key) {
        const t = paramType[key].toLowerCase();
        if (t === 'object' || t === 'array') {
          try {
            param[key] = JSON.parse(val);
          } catch (e) {
          }
        }
      });
    }

    // Send json to the backend
    if (JSON.stringify(param) == '"{}"') {
      try {
        let arrVersion = version.split('.');
        arrVersion = arrVersion.join('_');

        const jsonDomString = '#parameter-examples-' + group + '-' + name + '-' + arrVersion + '-0';
        const jsonText = $(jsonDomString)[0].innerText;
        param = jsonText;
      } catch (error) {

      }

    }

    // send AJAX request, catch success or error callback
    const ajaxRequest = {
      url,
      headers: header,
      data: param,
      type: type.toUpperCase(),
      success: displaySuccess,
      contentType,
      error: displayError,
    };

    $.ajax(ajaxRequest);


    function displaySuccess(data, status, jqXHR) {
      let jsonResponse;
      try {
        jsonResponse = JSON.parse(jqXHR.responseText);
        jsonResponse = JSON.stringify(jsonResponse, null, 4);
      } catch (e) {
        jsonResponse = data;
      }
      $root.find('.sample-request-response-json').html(jsonResponse);
      refreshScrollSpy();
    }

    function displayError(jqXHR, textStatus, error) {
      let message = 'Error ' + jqXHR.status + ': ' + error;
      let jsonResponse;
      try {
        jsonResponse = JSON.parse(jqXHR.responseText);
        jsonResponse = JSON.stringify(jsonResponse, null, 4);
      } catch (e) {
        jsonResponse = escape(jqXHR.responseText);
      }

      if (jsonResponse) { message += '<br>' + jsonResponse; }

      // flicker on previous error to make clear that there is a new response
      if ($root.find('.sample-request-response').is(':visible')) { $root.find('.sample-request-response').fadeTo(1, 0.1); }

      $root.find('.sample-request-response').fadeTo(250, 1);
      $root.find('.sample-request-response-json').html(message);
      refreshScrollSpy();
    }
  }

  function clearSampleRequest(group, name, version) {
    const $root = $('article[data-group="' + group + '"][data-name="' + name + '"][data-version="' + version + '"]');

    // hide sample response
    $root.find('.sample-request-response-json').html('');
    $root.find('.sample-request-response').hide();

    // reset value of parameters
    $root.find('.sample-request-param').each(function(i, element) {
      element.value = '';
    });

    // restore default URL
    const $urlElement = $root.find('.sample-request-url');
    $urlElement.val($urlElement.prop('defaultValue'));

    refreshScrollSpy();
  }

  function refreshScrollSpy() {
    $('[data-spy="scroll"]').each(function() {
      $(this).scrollspy('refresh');
    });
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  /**
     * Exports.
     */
  return {
    initDynamic,
  };

});

//

