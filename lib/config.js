
/*

  PrismTech licenses this file to You under the Apache License, Version 2.0
  (the "License"); you may not use this file except in compliance with the
  License and with the PrismTech Vortex product. You may obtain a copy of the
  License at

  http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
  License and README for the specific language governing permissions and
  limitations under the License.
 */

(function() {
  var dds;

  dds = {};

  dds.runtime = {};

  dds.runtime.controllerPath = '/vortex/controller';

  dds.runtime.readerPrefixPath = '/vortex/reader';

  dds.runtime.writerPrefixPath = '/vortex/writer';

  dds.runtime.controllerURL = function(server) {
    return server + dds.runtime.controllerPath;
  };

  dds.runtime.readerPrefixURL = function(server) {
    return server + dds.runtime.readerPrefixPath;
  };

  dds.runtime.writerPrefixURL = function(server) {
    return server + dds.runtime.writerPrefixPath;
  };

  module.exports = dds;

}).call(this);
