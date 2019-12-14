/*
 * Copyright 2015 Trim-marks Inc.
 *
 * This file is part of Vivliostyle UI.
 *
 * Vivliostyle UI is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Vivliostyle UI is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Vivliostyle UI.  If not, see <http://www.gnu.org/licenses/>.
 */

import ko, { PureComputed } from "knockout";
import { MessageQueue } from "../models/message-queue";

type ErrorInfo = {
  error: {
    frameTrace: string;
    stack: string;
  };
  messages: Array<string>;
};

class MessageDialog {
  list: MessageQueue;
  visible: PureComputed<boolean>;

  constructor(queue: MessageQueue) {
    this.list = queue;
    this.visible = ko.pureComputed(() => queue().length > 0);
  }

  getDisplayMessage(errorInfo: ErrorInfo) {
    const e = errorInfo.error;
    let msg = e && (e.toString() || e.frameTrace || e.stack);
    if (msg) {
      msg = msg.split("\n", 1)[0];
    }
    if (!msg) {
      msg = errorInfo.messages.join("\n");
    }
    return msg;
  }
}

export default MessageDialog;