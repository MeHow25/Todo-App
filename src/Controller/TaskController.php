<?php

namespace App\Controller;

use App\Entity\Task;
use App\Repository\TaskRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class TaskController extends AbstractController
{
    #[Route('/', name: 'app_task_index')]
    public function index(): Response
    {
        return $this->render('base.html.twig');
    }

    #[Route('/all_tasks', name: 'app_all_tasks', methods: ['GET'])]
    public function allTasks(TaskRepository $taskRepository): JsonResponse
    {
        $allTasks = $taskRepository->findBy(array('status' => ['todo','done']));
        $completedTasks = [];
        $notCompletedTasks = [];

        foreach ($allTasks as $task) {
            if ($task->getStatus() == 'done') {
                $completedTasks[] = $task;
            } elseif ($task->getStatus() == 'todo') {
                $notCompletedTasks[] = $task;
            }
        }

        return $this->json([
            'all_tasks' => $allTasks,
            'completed_tasks' => $completedTasks,
            'not_completed_tasks' => $notCompletedTasks,
        ]);
    }

    #[Route('/task_add', name: 'app_task_add', methods: ['POST'])]
    public function add(TaskRepository $taskRepository, Request $request): Response
    {
        $task = new Task();
        $task->setStatus('todo');
        $task->setContent($request->toArray()['content']);
        $taskRepository->save($task, true);

        return new JsonResponse($task);
    }

    #[Route('/status', name: 'app_task_change_status', methods: ['POST'])]
    public function changeStatus(EntityManagerInterface $entityManager, Request $request): Response
    {
        sleep(5);
        
        $availableStatuses = ['todo','done','deleted'];
        $target = $request->toArray()['status'];
        if (in_array($target, $availableStatuses)) {
            $task = $entityManager->getRepository(Task::class)->find($request->toArray()['id']);
            $task->setStatus($target);
            $entityManager->flush();
        } else {
            $error = 'Invalid target';
            $request->getSession()->set('error', $error);
        }
        return new JsonResponse(['status' => 'OK']);
    }

    #[Route('/delete_all', name: 'app_task_delete_all', methods: ['POST'])]
    public function deleteAll(EntityManagerInterface $entityManager, TaskRepository $tasksRepository): Response
    {
        $allTasks = $tasksRepository->findAll();

        foreach ($allTasks as $task) {
            $task->setStatus('deleted');
        }

        $entityManager->flush();

        return new JsonResponse();
    }
}
