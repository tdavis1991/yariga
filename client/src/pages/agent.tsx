import { useList } from "@pankod/refine-core";
import { Box, Typography } from "@pankod/refine-mui";

import { AgentCard } from "components"; 

const Agents = () => {
  const { data, isLoading, isError } = useList({
    resource: 'users'
  })

  return (
    <div>Agents</div>
  )
}

export default Agents;