const ServerPage = ({ params }: { params: { serverId: string } }) => {
    const { serverId } = params;
    return (
        <div>
            server id page {serverId}
        </div>
    );
}

export default ServerPage;