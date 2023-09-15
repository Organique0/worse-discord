import { Server } from "http";
import { NextApiRequest, NextApiResponse } from "next";
import { Server as ServerIo } from "socket.io";
import { Server as NetServer, Socket } from "net";

export type NextApiResponseServerIo = NextApiResponse & {
    socket: Socket & {
        server: NetServer & {
            io: ServerIo
        }
    }
}

export const config = {
    api: {
        bodyParser: false,
    }
}

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
    if (!res.socket.server.io) {
        const path = "/api/socket/io";
        const httpServer: Server = res.socket.server as any;
        const io = new ServerIo(httpServer, {
            path: path,
            //@ts-ignore
            addTrailingSlash: false,
        });
        res.socket.server.io = io;
    }
    res.end();
}
export default ioHandler;