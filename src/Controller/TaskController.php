<?php

namespace App\Controller;

use App\Entity\Task;
use App\Form\TaskType;
use App\Repository\TaskRepository;
use Doctrine\ORM\EntityManagerInterface;
use MercurySeries\FlashyBundle\FlashyNotifier;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class TaskController extends AbstractController
{
    #[Route('/', name: 'app_task_index')]
    public function index(TaskRepository $taskRepository, Request $request, FlashyNotifier $flashy): Response
    {
        $error = $request->getSession()->get('error');

        if ($error) {
            $flashy->error($error);
        }

        $request->getSession()->set('error', null);

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

        return $this->render('base.html.twig', [
            'all_tasks' => $allTasks,
            'completed_tasks' => $completedTasks,
            'not_completed_tasks' => $notCompletedTasks,
            'error' => $error
        ]);
    }

    #[Route('/api', name: 'app_task_index_json')]
    public function indexJson(TaskRepository $taskRepository, Request $request, FlashyNotifier $flashy): JsonResponse
    {
        $error = $request->getSession()->get('error');

        if ($error) {
            $flashy->error($error);
        }

        $request->getSession()->set('error', null);

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
            'error' => $error
        ]);
    }

    #[Route('/task_add', name: 'app_task_add')]
    public function add(TaskRepository $taskRepository, Request $request): Response
    {
        $task = new Task();

        $form = $this->createForm(TaskType::class, $task);

        $form->handleRequest($request);
        if ($form->isSubmitted()) {
            $taskRepository->save($task, true);

            return $this->redirectToRoute('app_task_index');
        }


        return $this->redirectToRoute('app_task_index');
    }

    #[Route('/task_add_json', name: 'app_task_add_json')]
    public function addJson(TaskRepository $taskRepository, Request $request): Response
    {
        $task = new Task();
        $task->setStatus('todo');
        $task->setContent($request->toArray()['content']);
        $taskRepository->save($task, true);

        return new JsonResponse($task);
    }

    #[Route('/{id}/status/{target}', name: 'app_task_change_status', methods: ['POST', 'GET'])]
    public function changeStatus(Task $task, EntityManagerInterface $entityManager, string $target, Request $request): Response
    {
        $availableStatuses = ['todo','done','deleted'];
        if (in_array($target, $availableStatuses)) {
            $task->setStatus($target);
            $entityManager->flush();
        } else {
            $error = 'Invalid target';
            $request->getSession()->set('error', $error);
        }
        return $this->redirectToRoute('app_task_index');
    }

    #[Route('/status-json', name: 'app_task_change_status_json', methods: ['POST', 'GET'])]
    public function changeStatusJson(EntityManagerInterface $entityManager, Request $request): Response
    {
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

    #[Route('/delete_all', name: 'app_task_delete_all', methods: ['POST', 'GET'])]
    public function deleteAll(EntityManagerInterface $entityManager, TaskRepository $tasksRepository): Response
    {
        $allTasks = $tasksRepository->findAll();

        foreach ($allTasks as $task) {
            $task->setStatus('deleted');
        }

        $entityManager->flush();

        return $this->redirectToRoute('app_task_index');
    }

    #[Route('/delete_all_json', name: 'app_task_delete_all_json', methods: ['POST', 'GET'])]
    public function deleteAllJson(EntityManagerInterface $entityManager, TaskRepository $tasksRepository): Response
    {
        $allTasks = $tasksRepository->findAll();

        foreach ($allTasks as $task) {
            $task->setStatus('deleted');
        }

        $entityManager->flush();

        return new JsonResponse();
    }
}
