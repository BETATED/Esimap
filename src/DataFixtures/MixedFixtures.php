<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

use App\Entity\User;

use Faker;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class MixedFixtures extends Fixture
{

    private $passwordEncoder;

    public function __construct(UserPasswordHasherInterface $passwordEncoder)
    {
        $this->passwordEncoder = $passwordEncoder;
    }

    public function load(ObjectManager $manager)
    {
        
       

        $faker = Faker\Factory::create('fr_FR');

      

        // Crée des utilisateurs avec des données fictives
        $users = $this->createUsers($manager);

      

        $manager->flush();
    }


    private function createUsers(ObjectManager $manager)
    {
        $users = [];
        $faker = Faker\Factory::create('fr_FR');
        for ($i = 1; $i <= 10; $i++) {
            $user = new User();
            $domain =  ["Agro", "Batiment", "Info"];
            $user->setEmail($faker->email);
            $user->setDomaine($domain[rand(0,2)]);
            $user->setPassword(
                $this->passwordEncoder->hashPassword(
                    $user,
                    "123456"
                ));
            

            $manager->persist($user);
            $users[] = $user;
        }

        return $users;
    }

   


 

    

    
}

