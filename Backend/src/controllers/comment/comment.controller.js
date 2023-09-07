import { StatusCodes } from "http-status-codes";
import { Message } from "../../utils/Message";
import { response } from "../../utils/response";

export const postComment = (req, res) => {
  try {
    const eventId = req.params?.id;
    const result = "Post Comment";
    return response(
      res,
      StatusCodes.ACCEPTED,
      true,
      result,
      Message.EVENT.CREATE
    );
  } catch (error) {
    console.log(error);
    return response(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      false,
      {},
      Message.INTERNAL_SERVER_ERROR
    );
  }
};
