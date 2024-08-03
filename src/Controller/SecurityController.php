<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;

class SecurityController extends AbstractController
{
    #[Route('/register', name: 'app_register', methods: ['POST'])]
    public function register(Request $request, UserPasswordHasherInterface $passwordHasher, EntityManagerInterface $entityManager): Response
    {
        $data = json_decode($request->getContent(), true);
        $email = $data['email'] ?? null;
        $password = $data['password'] ?? null;
    
        if (!$email || !$password) {
            return $this->json([
                'message' => 'Email and password are required',
            ], Response::HTTP_BAD_REQUEST);
        }
    
        $user = new User();
        $user->setEmail($email);
        $hashedPassword = $passwordHasher->hashPassword($user, $password);
        $user->setPassword($hashedPassword);
    
        $entityManager->persist($user);
        $entityManager->flush();
    
        return $this->json([
            'message' => 'Success.',
        ]);
    }

    #[Route('/login', name: 'app_login', methods: ['POST'])]
    public function login(): Response
    {
        if ($this->getUser()) {
            return $this->json([
                'user' => $this->getUser()->getUserIdentifier()
            ]);
        }

        return $this->json([
            'message' => 'Failed.',
        ], Response::HTTP_UNAUTHORIZED);
    }

    #[Route('/logout', name: 'app_logout', methods: ['POST'])]
    public function logout(): void
    {
        // todo to check if needed
    }

    #[Route('/me', name: 'app_me')]
    public function me(): Response
    {
        return $this->json([
            'user' => $this->getUser() ? $this->getUser()->getUserIdentifier() : null,
        ]);
    }
}