import { useState } from 'react';
import { projectAPI } from './projectAPI';
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { Project } from './Project';
import { useNavigate } from 'react-router';

export function useProjects() {
  const [page, setPage] = useState(0);
  const [name, setName] = useState("");
  let queryInfo = useQuery({
    queryKey: ['projects', page, name],
    queryFn: () => projectAPI.get(page + 1,undefined,name),
    placeholderData: (previousData) => previousData,
  });
  console.log(queryInfo);
  return { ...queryInfo, page, setPage, setName };
}

export function useSaveProject() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (project: Project) => project._id ? projectAPI.put(project) : projectAPI.post(project),
    onSuccess: (data, project) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      if (!project._id) {
        navigate(`/projects/${data.newProject._id}`)
      }
    }
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => projectAPI.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    }
  });
}