<?php

namespace App\DataFixtures;

use App\Entity\Company;
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
        $companies = $this->createCompany($manager);

      

        $manager->flush();
    }


    private function createUsers(ObjectManager $manager)
    {
        $users = [];
        $faker = Faker\Factory::create('fr_FR');
        for ($i = 1; $i <= 1; $i++) {
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

    private function createCompany(ObjectManager $manager)
    {
        $companies = [];
        $faker = Faker\Factory::create('fr_FR');
        for ($i = 1; $i <= 180; $i++) {
            $company = new Company();
            //$domain =  ["Agro", "Batiment", "Info"];
            $company->setName($faker->company());
            $company->setAddress($faker->address());
            $company->setCity($faker->city());
            $company->setCountry($faker->country());
            $company->setWebsite($faker->domainName());


            

            $manager->persist($company);
            $companies[] = $company;
        }

        return $companies;
    }

   


 

    

    
}

