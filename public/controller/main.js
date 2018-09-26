  var myApp=angular.module('myApp',['ngImgCrop','pascalprecht.translate','angularMoment','autocomplete'])
   //get country autocomplete
      myApp.factory('countryRetriever', function($http,$q, $timeout){
        var countryRetriever = new Object();
         countryRetriever.getCountry = function(country) {
            var data = $q.defer();
            var datas=null;
            var dataFromRemote;
          $http.get('/countries/'+country).then(function(response){
               dataFromRemote = JSON.stringify((response.data).map(function(obj){ return obj.country}));
                 //dataFromRemote=response.data
               var datas=JSON.parse(dataFromRemote);
               //var datas=dataFromRemote;
              $timeout(function(){
                data.resolve(datas);
              },1000);
            })
           return data.promise
        }
        return countryRetriever;
         });
         myApp.directive('countryEnter', function () {
            return function (scope, element, attrs) {
                element.bind("keydown keypress", function (event) {
                    if(event.which === 13) {
                        scope.$apply(function (){
                            scope.$eval(attrs.myEnter);
                        });

                        event.preventDefault();
                    }
                });
            };
         });
  //get country autocomplete
      myApp.factory('cityRetriever', function($http,$q, $timeout){
              var cityRetriever = new Object();
               cityRetriever.getCity = function(city,country) {
                  var data = $q.defer();
                  var datas=null;
                  var dataFromRemote;
                $http.get('/cities/'+city+'/'+country).then(function(response){
                     dataFromRemote = JSON.stringify((response.data).map(function(obj){ return obj.cityName}));
                     var datas=JSON.parse(dataFromRemote);
                    $timeout(function(){
                      data.resolve(datas);
                    },1000);
                  })
                 return data.promise
              }
              return cityRetriever;
               });
               myApp.directive('cityEnter', function () {
                  return function (scope, element, attrs) {
                      element.bind("keydown keypress", function (event) {
                          if(event.which === 13) {
                              scope.$apply(function (){
                                  scope.$eval(attrs.myEnter);
                              });

                              event.preventDefault();
                          }
                      });
                  };
               });
  //get country autocomplete
  myApp.factory('cityNetherlandRetriever', function($http,$q, $timeout){
       var cityNetherlandRetriever = new Object();
        cityNetherlandRetriever.getCity = function(city) {
           var data = $q.defer();
           var datas=null;
           var dataFromRemote;
         $http.get('/NetherlandCities/'+city).then(function(response){
              dataFromRemote = JSON.stringify((response.data).map(function(obj){ return obj.cityName}));
              var datas=JSON.parse(dataFromRemote);
             $timeout(function(){
               data.resolve(datas);
             },1000);
           })
          return data.promise
       }
       return cityNetherlandRetriever;
        });
        myApp.directive('cityEnter', function () {
           return function (scope, element, attrs) {
               element.bind("keydown keypress", function (event) {
                   if(event.which === 13) {
                       scope.$apply(function (){
                           scope.$eval(attrs.myEnter);
                       });

                       event.preventDefault();
                   }
               });
           };
        });
    //get profession autocomplete
     myApp.factory('professionRetriever', function($http,$q, $timeout){
       var professionRetriever = new Object();
        professionRetriever.getProfession= function(profession,languageKey) {
           var data = $q.defer();
           var datas=null;
           var dataFromRemote;
         $http.get('/listOfProfession/'+profession+'/'+languageKey).then(function(response){
              if(languageKey=='EN'){
                  dataFromRemote = JSON.stringify((response.data).map(function(obj){ return obj.english}));
              }else if(languageKey=='TG'){
               dataFromRemote = JSON.stringify((response.data).map(function(obj){ return obj.tigrigna}));

             }else if(languageKey=='NL'){
               dataFromRemote = JSON.stringify((response.data).map(function(obj){ return obj.dutch}));
             }else{
               dataFromRemote = JSON.stringify((response.data).map(function(obj){ return obj.english}));
             }
              var datas=JSON.parse(dataFromRemote);
             $timeout(function(){
               data.resolve(datas);
             },1000);
           })
          return data.promise
       }
       return professionRetriever;
        });
        myApp.directive('professionEnter', function () {
           return function (scope, element, attrs) {
               element.bind("keydown keypress", function (event) {
                   if(event.which === 13) {
                       scope.$apply(function (){
                           scope.$eval(attrs.myEnter);
                       });

                       event.preventDefault();
                   }
               });
           };
        });
  /*
//  translate
  */
   myApp.config(function($translateProvider) {
      $translateProvider.fallbackLanguage('EN');
      $translateProvider.registerAvailableLanguageKeys(['EN','NL','TG'],{
        'en_*':'EN',
        'du_*':'NL',
        'tg_*':'TG'
      })
         $translateProvider.translations('EN', {
            loginHeadline: 'Login',
            loginButton: 'Login',
            chooseLanguage: 'Choose languages',
            registerHere: 'Not a member? Register here.',
            close:'Close',
            enterValidName:'Enter Name',
            enterUsername:'Enter valid user name',
            enterValidEmail:'Enter valid Email',
            enterPassword:'Enter password',
            passwordMismutch:'Password Mismatch',
            atLeast6Char:'Enter at least 6 characters',
            repeatPassword:'repeat password',
            email:'Email',
            submit:'Submit',
            home:'Home',
            workAndProfessionRegistration:'Work and Profession registrations',
            online:'Online',
             employeeAndEmployer:'Employee and Employer',
             travelRegistration:'Travel Registration',
             findTranport:'Find Transports',
             dailyLifeHappenings:'Daily life',
             chatRoom:'Chat Rooms',
             issuesAndSuggestions:'Issues and their solutions',
             thingsToSale:'Item for Sale',
             notifications:'Notifications',
             tasks:'User Tasks',
             userSettings:'User Settings',
             completed:'Completed',
             setting:'Settings',
             logout:'Logout',
             post:'Post',
             writePostInfo:'Write your post here',
             uploadImage:'Upload your image here',
             like:'Like',
             comment:'Comments',
             writeComment:'Write Comment',
             send:'Send',
             onlineUsers:'Online Users',
             client:'Clients',
             sendMessage:'Send Message',
             professionals:'Professionals',
             profession:'Profession',
             share:'Share',
             lookingFor:'Looking for',
             livesIn:'Lives in ',
             hasJobOf:'has a job of',
             searchingForAjob:'Searching for a job',
             joinToRooms:'Join a room',
             memebers:'Memebers',
             youAreInRoom:'You are in',
             roomOwner:"'s room",
             soYouAreLookingFor:'So you are looking for',
             writeWorkSummary:'Summary of the work description',
             exceedTheLimit:'Exceed the limit',
             youAreLookingNow:'Your work situation at this time',
             telephone:'Telephone',
             howLongDoesTheWorkTakes:'How long does the work takes',
             saveUpdate:'Save/Update',
             professionRegistration:'Profession registration',
             generalSummaryAboutYou:'General summary about yourself',
             mainProfession:'Main profession',
             yourWorkingPeriodIs:'Availability',
             IAmNow:'Currently I am ',
             employees:'Employees',
             offline:'Offline',
             dateOfBirth:'Date of birth',
             workToBeDone:'Work details',
             sendMessageHere:'Send message here',
             reply:'Reply to this comment',
             writeSuggestion:'Write suggestions',
             problemDescription:'Description of the problem',
             postedOn:'Posted on',
             seeSuggestion:'See suggestions',
             address:'Address',
             whoMaySolveThisProblem:'Who might be able to solve this problem',
             idontknow:'I dont know',
             submitSuggestion:'Submit suggestion',
             journeySchedules:'Journey schedules',
             transportType:'Transport type',
             from:'From',
             to:'To',
             date:'Date',
             code:'Code',
             transportRegistration:'Register means of transport',
             activeFromTo:'Active from - to',
             numberOfSeats:'NumberOfSeats',
             additionalInfo:'Additional information',
             travelByTrainRegistration:'Register to travel by train',
             registerToTravelByAnyTransport:'Register to travel by any means of transport',
             journeyDetails:'Journey Details',
             registerHere:'Register here',
             by:'By',
             freeSpace:'Free space',
             fillYourTelephoneHereThenClick:'Fill in your telephone number here then click',
             filterHeadingsHere:'Filter headings here',
             posted:'Posted',
             postedBy:'Posted by',
             historyType:'History type',
             title:'Title',
             subTitle:'Subtitle',
             writeDetailsHereBelow:'Write detailed description below',
             hereBelow:'Below',
             uploadImageOrVidio:'Upload image/vidio',
             startNew:'New post +',
             addNewSubTitle:'Add new subtitle +',
             notification:'Notifications',
             messages:'Messages',
             seeDetails:'See user details',
             fullName:'Full name',
             gender:'Gender',
             workDetails:'Work details',
             timeTaken:'Time taken',
             workSession:'Work session',
             travellingDate:'Travelling date',
             transportChoosed:'Transport chosen',
             employersAndEmployees:'Employers and employees',
             whoShouldRegisterAsEmployer:'Who should register as employer',
             whoShouldRegisterAsEmployee:'Who should register as employee',
             employer:'Employer',
             username:'Username',
             password:'Password',
             updateYourInformation:'Setting:Set your setting.',
             selectProfileImage:'Select profile image',
             yourProfilePictureLooksLike:'Your profile picture looks like this',
             updateUserSettings:'Update user settings',
             filterBy:'Filter by',
             saleThingsPost:'Post items for sale',
             catagories:'Catagery',
             price:'Price',
             where:'Location',
             description:'Description',
             uploadImage:'Upload image',
             upload:'Upload',
             youHaveWorksToBeDone:'You have works to be done',
             youAreLookingForProfessionals:'You are looking for professionals',
             youHaveProfession:'You have profession',
             youNeedToWork:'You need to work',
             dailyLifeHappenings:'Daily life',
             news:'News',
             dictations:'Discussion',
             fictions:'Stories',
             travelAndTravelSchedules:'Travel and travel schedules',
             writeNewsHere:'Write news, discussion topics,stories here',
             backToRooms:'Back to rooms',
             problemsAndTheriSolutions:'Problems and their solutions',
             reportHereIfYouHaveProblem:'Report your problem here.',
             thingsToSale:'Items for sale',
             userSettings:'Settings',
             clickHere:'Click here',
             backToDailyLifeHomePage:'Back to daily life  home page',
             numberOfPeople:'Number of people',
             date:'Date',
             youDontHaveProfessionButYouNeedToWork:'You dont have profession but are looking for any kind of work',
             generalInformationAboutEmployerRegistration:'General Information about why you need to register as employer',
             whyEmployer:'When registering as an employer,specify what work you wish to have done either  by a professional or non professional.You can then  go on to hire someone to do the work.Work can be anything from house painting to ICT,to health or social care etc.',
             listOfAllProfessionals:'List of all professionals',
             professionalRegistration:'Register as an employee',
             employerRegistration:'Register as an employer',
             listOfAllClients:'List of all employers',
             save:'save',
             seeTravelInfo:'Look for travel information',
             delete:'Delete',
             daysAgo:'Days ago',
             clientRegistration:'Employer Registration',
             passengerRemarks:'Passenger Remarks. NB:Fill in the passengers full name and email address',
             country:'Country',
             ILiveOutSideNetherlands:'Do you live outside the Netherlands?',
             cityOrTown:'City/town/village',
             sendNewsText:'Send text',
             chooseCity:'Choose city',
             mobileProblems:'Mobile Problems',
             computerProblems:'Computer Problems',
             healthyProblems:'Health Problems',
             others:'Others',
             problemType:'Problem Type',
             notStatedHere:'Not in the list?',
             Settings:'Settings',
             createRoom:'Create room',
             uploadFile:'Upload file',
             sendWorkRequest:'Work Request',
             friendRequest:'Friend Request',
             wrongUserNameOrPassword:'Wrong user name or password',
             alreadyHaveAccount:'Already Have an account ? Sign in',
             register:'Register',
             signup:'You do not have an account ? Register.',
             successfullyRegistered:'Registered successfully!Thank you so much for registering with us.We hope it makes you happy.',
             gettingAjob:'Searching for a job:',
             postingAjob:'Posting a job:',
             gettingBestCandidate:'Finding the best candidate for  a job:',
             gettingAjobWithNoProfession:'Finding a job even if you do not have profession:',
             postingIssues:'posting issues and finding their solutions:',
             gettingNews:'Getting the latest news,reading stories:',
             privateChatsAndGroupChats:'Private chat with friends and group chat:',
             postingHobies:'Posting various hobbies or advertisments and getting reactions from your friends over your posts:',
             gettingItemsToSale:'Getting Items for sale:',
             journeySchedules:'Planning your journey:',
             searchAjob:'Search a job',
             yourPreviousChoosen:'Your previous choosen was:',
             subWorkIsCatagorizedUnder:' Your previous sub Categories choosen was: ',
             userSetting:'User Setting',
             userProfile:'Change Profile Picture',
             userPosts:'User Posts',
             registerEmployerIf:'You can register as employer if:-',
             registerEmployeeIf:'You can register as employee if:-',
             yourhelplabdotcom:'YOUR HELP LAB',
             seeMoreMessages:'see more messages',
             aboutUser:'About this user',
             seeMoreNotifications:'see more notifications',
             seeMoreFriendRequest:'see more friend requests',
             professionalOnlineStatus:'is online now',
             mainProfessionHomePage:'Profession',
             city:'City',
             getNewsAtHomePage:'Get News',
             backtosearchHomepage:'Home',
             searchOnHomepage:'Search',
             getItemForSaleHomepage:'Search Item For Sale',
             homePageInfo:"Wellcome,This website is all about work opportunities,we are always looking for new ways to connect employer and employee and find solutions to all your employment related problems.We are concerned with people any and every profession not forgeting those who have no professional skills who we can connect with the range of non skilled jobs.Employers can search employees on a permanent,short term or casual basis.Below are the links you can follow.",
             contactus:'Contact us',
             aboutus:'About',
             gotohomepage:'Go to home page',
             gotologinpage:'Go to login page',
             websiteAddress:'Web site address',
             chooseProfession:'Choose/Change profession',
             changeWorkTime:'Change work time',
             situation:' You can change your situation here',
             chooseProfessions:'Load professions and choose',
             chooseCountry:'Load countries and choose',
             chooseCity:'Load cities and choose',
             buy:'Buy',
             cancel:'Cancel',
             buyThingsPost:'Details',
             itemName:'Item Name',
             unit:'Currency',
             getBoughtItems:'Cart',
             backToSalePage:'Back to sale page',
             numberOfItems:'How many peaces of this item do you need ?',
             amount:'Amount',
             firstName:'First Name',
             middelName:'Middel Name',
             surName:'Surname',
             postCode:'Post Code',
             houseNumber:'House Number',
             street:'Street',
             addressInfo:'Address Information',
             buyerInfo:'Buyer Information',
             total:'Total',
             action:'Action',
             chatWithSupplier:'Chat with Supplier',
             size:'size',
             newpassword:'New password',
             changePassword:'Change password',
             change:'Change',
             BackToLogin:'Back to login page',
             forgetPassword:'Forget password ?',
             professionalMotivation:'See worker motivations',
             backtosearchHomepage:'Home',
             backToClientsList:'Back to clients list',
             backToProfessionalsList:'Back to professionals list',
             employeeClient:'(Employee)',
             employerClient:'(Employer)',
             request:'Request',
             chatWithTransportOwner:'Chat with the owner',
             passengerRemarks:'Remarks',
             getAllAcceptedRequests:'Get all travellers that i accepted them',
             getAllRequests:'Get all travel requests',
             whoAcceptedMe:'Check who accepted my request to travel',
             registerFormInvalid:'Fill the form completly',
             fromTime:'Available from',
             toTime:'Available till',
             getInTouchWithUs:'Get in touch with us',
             gotopayment:'Go to payment',
             next:'next',
             writeWorkDetails:'Work Detail',
             jobSearch:'Job Search',
             searchCandidate:'Employee Search',
             jobPosts:'Job Posts',
             issuePost:'Post Issues',
             journey:'Journey Schedules',
             getNews:'News',
             itemsForSale:'Items for sell',
             getJobDesc:"You can search a job based on any profession  at different cities.",
             getEmployeeDesc:"You can search for employee based on their professions at different cities.",
             postJobDesc:"You can post a job if you have any.Inorder to post a job you need to be registered with us then you can have more benefits of this website.",
             getNewsDesc:"You can get upto date news,reading histories or see a discussions amoung people about different trends like posting questions there and get answer.",
             getItemsToSaleDesc:"You can get items for sale which are probably cheaper in terms of price.",
             noProfessionDesc:"In this webiste you do not have to worry about having a profession or not,just register and we will find a job for you which does not require any profession also if you have profession then it would be more easy to get a job by your profession.",
             postingIssueDesc:"You can post issues then according your issues we will find assistant who has profession by the issue you posted.",
             chatDesc:"You can chat privatly and in group too when you register with us.",
             postHobbiesDesc:"You can post work advertisments,hobbies and you will get reactions from users.",
             journeyDesc:"You can schedule a journey and you can look what vehicle is available for your journey.",
             profPlaceHolder:'',
             countryPlaceHolder:'',
             cityPlaceHolder:'',
             transportRegistrationAdvice:'Do you own transport and you need to use this golden chance, then you have to register and your vihecle will be listed online here.',
             journeyByPlane:'Do you need to travel by Air plane please contact us for a cheap ticket.',
             sendMoney:'Do you need money transfer to Eritrea using western union legaly ? then contact us.',
             passengers:'Passengers',
             transports:'transports',
             writeCityNameWhereULive:'Please write name of the city where you live in',
             travelByMeansOfTransport:'Travel informations',
             uploadTransportImage:'Upload transport image',
             itemImage:'Item Image here',
             itemWillBeLookingLikeThis:'Item will look like this',
             addSaleItemButton:'add',
             itemAmount:'Number of Items',
             itemSize:'Item size in kg,m,pcs....',
             newItemToSaleButton:'New Item',
             addItemToSale:'Add item to sale',
             backToSaleHomePage:'Back to sale item home page',
             newsPageIntro:'Source of News,telling stories and discussion amoung people for a better solution.',
             travelPageIntro:'Where do you need to go?<br/> This page is all about travellers and means of transports ready for your journey.',
             salePageIntro:'Do you need something to buy? Then you are in the rightway.This page is all about buying and saling things.'
          })
          .translations('NL', {
            loginHeadline: 'Login',
            loginButton: 'login',
            chooseLanguage: 'Kies taal',
            registerHere: 'Geen lid? Registreer hier.',
            close:'Sluiten',
            enterValidName:'Vul naam in',
            enterUsername:'Voer geldige gebruikersnaam in',
            enterValidEmail:'Voer geldig email adres in',
            enterPassword:'Voer wachtwoord in',
            passwordMismutch:'Wachtwoord niet gelijk',
            atLeast6Char:'Voer tenminste 6 karakter',
            repeatPassword:'Herhaal wachtwoord',
            email:'Email',
            submit:'Verzenden',
            home:'Home',
            workAndProfessionRegistration:'Werk en beroep registratie ',
            online:'Online',
             employeeAndEmployer:'Werknemer en werkgever',
             travelRegistration:'Reis registratie',
             findTranport:'Vind vervoer',
             dailyLifeHappenings:'Dagelijks leven',
             chatRoom:'Chat Rooms',
             issuesAndSuggestions:'Problemen en oplossingen',
             thingsToSale:'Item in de uitverkoop',
             notifications:'Notificaties',
             tasks:'Gebruikerstaken',
             userSettings:'Gebruikersinstellingen',
             completed:'Klaar zijn',
             setting:'Instellingen',
             logout:'Logout',
             post:'Post',
             writePostInfo:'Schrijf jouw bericht',
             uploadImage:'Upload hier je afbeelding',
             like:'Like',
             comment:'opmerkingen',
             writeComment:'Schrijf commentaar',
             send:'Verzenden',
             onlineUsers:'Online gebruikers',
             client:'Klanten',
             sendMessage:'Verzend bericht',
             professionals:'Professionals',
             profession:'Beroep',
             share:'Delen',
             lookingFor:'Op zoek naar',
             livesIn:'Woont in ',
             hasJobOf:'Heeft werk voor',
             searchingForAjob:'Opzoek naar werk',
             joinToRooms:'Kom in de room',
             memebers:'Leden',
             youAreInRoom:'Je bent in room',
             roomOwner:"'s room",
             soYouAreLookingFor:'Dus ben je opzoek naar',
             writeWorkSummary:'Samenvatting van de werkbeschrijving',
             exceedTheLimit:'Limiet overschreden',
             youAreLookingNow:'Je werksituatie op dit moment',
             telephone:'Telefoon',
             howLongDoesTheWorkTakes:'Hoe lang duurt het werk',
             saveUpdate:'Opslaan/updaten',
             professionRegistration:'Beroep registratie',
             generalSummaryAboutYou:'Algemene samenvatting over jezelf',
             mainProfession:'Hoofdberoep',
             yourWorkingPeriodIs:'Beschikbaarheid',
             IAmNow:'Momenteel ben ik dat ',
             employees:'Werknemers',
             offline:'Offline',
             dateOfBirth:'Geboortedatum',
             workToBeDone:'Werk details',
             sendMessageHere:'Stuur bericht hier',
             reply:'Reageer op deze reactie',
             writeSuggestion:'Schrijf suggesties',
             problemDescription:'Beschrijving van het probleem',
             postedOn:'Geplaatst op',
             seeSuggestion:'Zie suggesties',
             address:'Adres',
             whoMaySolveThisProblem:'Wie zou dit probleem kunnen oplossen',
             idontknow:'Ik weet het niet',
             submitSuggestion:'Suggestie indienen',
             journeySchedules:'het plannen van je reis',
             transportType:'Transport type',
             from:'Van',
             to:'Naar',
             date:'Datum',
             code:'Code',
             transportRegistration:'Registreer transportmiddelen',
             activeFromTo:'Actief van - tot',
             numberOfSeats:'Aantal zitplaatsen',
             additionalInfo:'Extra informatie',
             travelByTrainRegistration:'Registreer om te reizen met de trein',
             registerToTravelByAnyTransport:'Registreer om te reizen met elk vervoermiddel',
             journeyDetails:'Reisdetails',
             registerHere:'Registreer hier',
             by:'Door',
             freeSpace:'Vrije ruimte',
             fillYourTelephoneHereThenClick:'Vul hier uw telefoonnummer in en klik vervolgens op',
             filterHeadingsHere:'Filterkoppen hier',
             posted:'Geplaatst',
             postedBy:'Gepost door',
             historyType:'Geschiedenis type',
             title:'Titel',
             subTitle:'Ondertitel',
             writeDetailsHereBelow:'Schrijf een gedetailleerde beschrijving',
             hereBelow:'Beneden',
             uploadImageOrVidio:'Upload afbeelding / vidio',
             startNew:'Nieuw post +',
             addNewSubTitle:'Nieuwe ondertiteling toevoegen +',
             notification:'Meldingen',
             messages:'Berichten',
             seeDetails:'Bekijk gebruikersgegevens',
             fullName:'Voor-en achternaam',
             gender:'Geslacht',
             workDetails:'Werk details',
             timeTaken:'Tijd genomen',
             workSession:'Werksessie',
             travellingDate:'Reisdatum',
             transportChoosed:'Transport gekozen',
             employersAndEmployees:'Werkgevers en werknemers',
             whoShouldRegisterAsEmployer:'Wie moet zich als werkgever registreren',
             whoShouldRegisterAsEmployee:'Wie moet zich als werknemer registreren?',
             employer:'Werkgever',
             username:'Gebruikersnaam',
             password:'Wachtwoord',
             updateYourInformation:'Setting: Stel uw instelling in.',
             selectProfileImage:'Selecteer profielafbeelding',
             yourProfilePictureLooksLike:'Je profielfoto ziet er zo uit',
             updateUserSettings:'Update gebruikersinstellingen',
             filterBy:'Ilteren op',
             saleThingsPost:'Items posten die te koop zijn',
             catagories:'Catagorieën',
             price:'Prijs',
             where:'Locatie',
             description:'Beschrijving',
             uploadImage:'Afbeelding uploaden',
             upload:'Uploaden',
             youHaveWorksToBeDone:'Je hebt werk aan de winkel',
             youAreLookingForProfessionals:'Je bent op zoek naar professionals',
             youHaveProfession:'Je hebt een beroep',
             youNeedToWork:'Je moet werken',
             dailyLifeHappenings:'Dagelijks leven',
             news:'Nieuws',
             dictations:'Discussie',
             fictions:'Verhalen',
             travelAndTravelSchedules:'Reis- en reisschema',
             writeNewsHere:'Schrijf nieuws, discussieonderwerpen, verhalen hier',
             backToRooms:'Terug naar kamers',
             problemsAndTheriSolutions:'Problemen en hun oplossingen',
             reportHereIfYouHaveProblem:'Meld hier uw probleem.',
             thingsToSale:'Producten te koop',
             userSettings:'Instellingen',
             clickHere:'Klik hier',
             backToDailyLifeHomePage:'Terug naar de homepage van het dagelijkse leven',
             numberOfPeople:'Aantal mensen',
             date:'Datum',
             youDontHaveProfessionButYouNeedToWork:'Je hebt geen professional maar bent op zoek naar werk',
             generalInformationAboutEmployerRegistration:'Algemene informatie over waarom u zich als werkgever moet registreren',
             whyEmployer:'Wanneer u zich registreert als werkgever, geeft u aan welk werk u wilt laten doen door een professional of niet-professional. Vervolgens kunt u iemand inhuren om het werk te doen. Het kan van alles zijn, van huisschilderij tot ICT, tot gezondheidszorg of sociale zorg. enz.',
             listOfAllProfessionals:'Lijst van alle professionals',
             professionalRegistration:'Registreer als een werknemer',
             employerRegistration:'Registreer als werkgever',
             listOfAllClients:'Lijst van alle werkgevers',
             save:'Opslaan',
             seeTravelInfo:'Kijk reisinformatie',
             delete:'Verwijderen',
             daysAgo:'Dagen geleden',
             clientRegistration:'Werkgeversregistratie',
             passengerRemarks:'Opmerkingen van passagiers. NB: vul de volledige naam en het e-mailadres van de passagiers in',
             country:'Land',
             ILiveOutSideNetherlands:'Woon je buiten Nederland?',
             cityOrTown:'stad/dorp',
             sendNewsText:'Stuur tekst',
             chooseCity:'Kies stad',
             mobileProblems:'Mobiele problemen',
             computerProblems:'Computerproblemen',
             healthyProblems:'Gezondheidsproblemen',
             others:'Anderen',
             problemType:'Probleem Type',
             notStatedHere:'Niet in de lijst?',
             Settings:'Instellingen',
             createRoom:'Ruimte creëren',
             uploadFile:'Upload bestand',
             sendWorkRequest:'Werkaanvraag',
             friendRequest:'Vriendschapsverzoek',
             wrongUserNameOrPassword:'Verkeerde gebruikersnaam of wachtwoord',
             alreadyHaveAccount:'Heb je al een account? Aanmelden',
             register:'Registreren',
             signup:'Heb je geen account? Registreer.',
             successfullyRegistered:'Met succes geregistreerd! Hartelijk dank voor uw registratie. We hopen dat het u gelukkig maakt.',
             gettingAjob:'Op zoek naar een baan:',
             postingAjob:'Een baan plaatsen:',
             gettingBestCandidate:'De beste kandidaat voor een baan vinden:',
             gettingAjobWithNoProfession:'Een baan vinden, ook als je geen beroep uitoefent:',
             postingIssues:'Problemen posten en oplossingen vinden:',
             gettingNews:'Het laatste nieuws ontvangen, verhalen lezen:',
             privateChatsAndGroupChats:'Prive-chat met vrienden en groepschat:',
             postingHobies:'Verschillende hobbys of advertenties plaatsen en reacties van je vrienden op je berichten ontvangen:',
             gettingItemsToSale:'Producten in de aanbieding kopen:',
             journeySchedules:'Jouw reisroute plannen om te reizen:',
             searchAjob:'Zoek een baan',
             yourPreviousChoosen:'Uw vorige keuze was:',
             subWorkIsCatagorizedUnder:' Je vorige subcategorieën die je hebt gekozen, waren: ',
             userSetting:'Gebruikersinstelling',
             userProfile:'Profielfoto veranderen',
             userPosts:'Gebruikersposten',
             registerEmployerIf:'U kunt zich als werkgever registreren als: -',
             registerEmployeeIf:'U kunt zich als werknemer registreren als: -',
             yourhelplabdotcom:'JOUW HELP LAB',
             seeMoreMessages:'Zie meer berichten',
             aboutUser:'Over deze gebruiker',
             seeMoreNotifications:'Zie meer meldingen',
             seeMoreFriendRequest:'Zie meer vriendenverzoeken',
             professionalOnlineStatus:'is nu online',
             mainProfessionHomePage:'Beroep',
             city:'Stad',
             getNewsAtHomePage:'Ontvang nieuws',
             backtosearchHomepage:'Home',
             searchOnHomepage:'Zoeken',
             getItemForSaleHomepage:'Zoek item te koop',
             homePageInfo:"Welkom, deze website heeft alles te maken met werkmogelijkheden, we zijn altijd op zoek naar nieuwe manieren om werkgevers en werknemers te verbinden en oplossingen te vinden voor al uw werkgerelateerde problemen. We houden ons bezig met mensen en niet met mensen die geen professionele vaardigheden hebben we kunnen verbinding maken met het scala aan niet-bekwame banen. Werkgevers kunnen werknemers op permanente, korte of toevallige basis zoeken. Hieronder vindt u de koppelingen die u kunt volgen.",
             contactus:'Neem contact met ons op',
             aboutus:'Over',
             gotohomepage:'Ga naar homepagina',
             gotologinpage:'Ga naar loginpagina',
             websiteAddress:'Website adres',
             chooseProfession:'Kies / verander beroep',
             changeWorkTime:'Verander de werktijd',
             situation:'Je kunt hier je situatie veranderen',
             chooseProfessions:'Laad beroepen en kies',
             chooseCountry:'Laad landen en kies',
             chooseCity:'Laad steden en kies',
             buy:'Kopen',
             cancel:'Annuleer',
             buyThingsPost:'Gegevens',
             itemName:'Itemnaam',
             unit:'Valuta',
             getBoughtItems:'kar',
             backToSalePage:'Terug naar verkooppagina',
             numberOfItems:'Hoeveel stuks van dit artikel heb je nodig?',
             amount:'Bedrag',
             firstName:'Voornaam',
             middelName:'Midden-naam',
             surName:'Achternaam',
             postCode:'Postcode',
             houseNumber:'Huisnummer',
             street:'Straat',
             addressInfo:'Adres informatie',
             buyerInfo:'Kopersinformatie',
             total:'Totaal',
             action:'Actie',
             chatWithSupplier:'Chatten met de leverancier',
             size:'Grootte',
             newpassword:'Nieuw paswoord',
             changePassword:'Verander wachtwoord',
             change:'Verandering',
             BackToLogin:'Terug naar inlogpagina',
             forgetPassword:'Wachtwoord vergeten ?',
             professionalMotivation:'Zie motivaties van werknemers',
             backtosearchHomepage:'Home',
             backToClientsList:'Terug naar klantenlijst',
             backToProfessionalsList:'Terug naar lijst met professionals',
             employeeClient:'(werknemer)',
             employerClient:'(werkgever)',
             request:'Verzoek',
             chatWithTransportOwner:'Chatten met de eigenaar',
             passengerRemarks:'Opmerkingen',
             getAllAcceptedRequests:'Alle reizigers zover krijgen dat ik ze accepteer',
             getAllRequests:'Krijg alle reisverzoeken',
             whoAcceptedMe:'Controleren wie mijn verzoek om te reizen heeft aanvaard',
             registerFormInvalid:'Vul het formulier volledig in',
             fromTime:'Beschikbaar van',
             toTime:'Beschikbaar tot',
             getInTouchWithUs:'Neem contact op met ons',
             gotopayment:'ga naar betaling',
             next:'volgende',
             writeWorkDetails:'werk details',
             jobSearch:'Werk zoeken',
             searchCandidate:'Werknemer zoeken',
             jobPosts:'baan plaatsen',
             issuePost:'Post problemen',
             journey:'Reisschema\'s',
             getNews:'Nieuws',
             itemsForSale:'Items voor verkopen',
             getJobDesc:"U kunt een baan zoeken op basis van een beroep in verschillende steden.",
             getEmployeeDesc:"U kunt zoeken naar werknemers op basis van hun beroep in verschillende steden.",
             postJobDesc:"Je kunt een baan plaatsen als je die hebt. Om een baan te plaatsen moet je bij ons geregistreerd zijn, dan kun je meer voordelen van deze website hebben.",
             getNewsDesc:"Je kunt up-to-date nieuws krijgen, geschiedenis lezen of een discussie zien tussen mensen over verschillende trends, zoals het plaatsen van vragen daar en krijg antwoord.",
             getItemsToSaleDesc:"U kunt items te koop krijgen die waarschijnlijk goedkoper zijn in termen van prijs.",
             noProfessionDesc:"In deze webiste hoeft u zich geen zorgen te maken over het hebben van een beroep of niet, u hoeft zich alleen maar aan te melden en we zullen een baan voor u vinden waarvoor geen beroep vereist is, maar als u een beroep uitoefent, dan zou het eenvoudiger zijn om een baan te vinden voor uw beroep.",
             postingIssueDesc:"Je kunt problemen posten en vervolgens zullen we, afhankelijk van je problemen, een assistent vinden die beroep uitoefent op het probleem dat je hebt gepost.",
             chatDesc:"U kunt ook privé en in groep chatten wanneer u zich bij ons registreert.",
             postHobbiesDesc:"Je kunt werkadvertenties, hobby's plaatsen en reacties van gebruikers ontvangen.",
             journeyDesc:"U kunt een reis plannen en u kunt kijken welk voertuig beschikbaar is voor uw reis.",
             profPlaceHolder:'Bereop',
             countryPlaceHolder:'land',
             cityPlaceHolder:'stad',
             transportRegistrationAdvice:'Heb je eigen vervoer en moet je deze gouden kans benutten, dan moet je je registreren en je viècle wordt hier online vermeld.',
             journeyByPlane:'Wilt u reizen per vliegtuig, neem dan contact met ons op voor een goedkoop ticket.',
             sendMoney:'Heeft u geldtransfers naar Eritrea nodig met behulp van Western Legaly? neem dan contact met ons op.',
             passengers:'passagiers',
             transports:'transporten',
             writeCityNameWhereULive:'voer de naam in van de stad waar je woont',
             travelByMeansOfTransport:'reisinformatie',
             uploadTransportImage:'upload transportafbeelding',
             itemImage:'Item afbeelding hier',
             itemWillBeLookingLikeThis:'Item ziet er als volgt uit',
              itemWillBeLookingLikeThis:'Item will look like this',
             addSaleItemButton:'toevoegen',
             itemAmount:'Aantal stuks',
             itemSize:'Artikelgrootte in kg, m, stuks ....',
             newItemToSaleButton:'nieuw item',
             addItemToSale:'item aan verkoop toevoegen',
             backToSaleHomePage:'terug naar startpagina verkoopartikelen',
             newsPageIntro:'Bron van Nieuws, verhalen vertellen en discussiëren tussen mensen voor een betere oplossing.',
             travelPageIntro:'Waar moet je heen? <br/> Op deze pagina staat alles over reizigers en transportmiddelen klaar voor uw reis.',
             salePageIntro:'Heb je iets nodig om te kopen? Dan bent u op de goede weg. Deze pagina gaat over het kopen en verzegelen van dingen.'
          })
          })
          .translations('TG', {
            loginHeadline: 'መእተዊ',
            loginButton: 'እቶ',
            chooseLanguage: 'ቋንቋ ምረጽ',
            registerHere: 'ኣባል ተዘይኮንካ ኣብዚ ተመዝገብ',
             close:'ዕጾ',
             registration:'ምዝገባ',
             fullName:'ሙሉእ ስም',
            username:'መጠቐሚ ስም',
            name:'ሙሉእ ስም',
            dateOfBirth:'ዕለተ ልደት',
            gender:'ጾታ',
            email:'ኢመይል',
            password:'ቃለ ምስጢር የእቱ',
            repeatPassword:'ቃለ ምስጢር ድገሞ',
            passwordMismutch:'ኣብ ላዕሊ ዘእተኹሞ ቃለ ምስጢር ምስዚ ሕጂ ዘእተኹሞ ሓደ ዓይነት ኣይኮነን። ',
             home:'መጀመሪ',
            workAndProfessionRegistration:'ስራሕን ሞያን ምምዝጋብ',
            online:'ሕጂ ኣብ መስመር ኣለኹም',
             employeeAndEmployer:'ኣስራሕን ሰራሕተኛን',
             travelRegistration:'ናይ ጉዕዞ ምዝገባ',
             findTranport:'ተጓዓዝቲ ድለ',
             dailyLifeHappenings:'እብ መዓልታዊ ሂወት ዘጋጥም',
             chatRoom:'ዝርርብ',
             issuesAndSuggestions:'ጉዳያት',
             thingsToSale:'ዝሽየጡ ነገራት',
             notifications:'ምልክታታት',
             tasks:'ናይ ተጠቓሚ ዕማማት',
             userSettings:'ናይ ተጠቓሚ ሓበሬታ ምምዕርራያት',
             completed:'ተወዲኡ',
             setting:'ናይ ተጠቓሚ ሓበሬታ ምምዕርራያት',
              logout:'መውጽኢ።',
              post:'ፖስት',
              writePostInfo:'መግለጺ ፖስትኻ ኣብዚ ጸሓፍ',
              uploadImage:'ስእሊ ኣብዚ ጸዓን',
               like:'ሰብ ነዛ ፖስት ፈቲዮማ ኣለዉ',
             comment:'ርኢቶታት',
             writeComment:'ርኢቶ ጸሓፍ',
             send:'ስደድ',
             onlineUsers:'ኣብ መስመር ዘለዉ ተጠቐምቲ',
             client:'ናይ ስራሕ ዓማዊል(ስራሕ ዘለዎም ሰባት)',
             sendMessage:'መልአኽቲ ስደድ',
             professionals:'ሞያውያን (ስራሕ ዝደልዩ ዘለዉ፥ ሞያ ዘለዎም ሰባት)',
             profession:'ሞያ',
             share:'ኣካፍል',
             lookingFor:'ዝድለ ዘሎ ሞያ',
             livesIn:'ዝነብረሉ ቦታ',
              hasJobOf:'ስራሕ ንኽፍጸም ዝወስደሉ ግዜ',
             searchingForAjob:'ስራሕ የናዲ ኣሎ',
             joinToRooms:'ክፉታት ዘለው ክፍልታት',
             memebers:'ኣባላት',
             youAreInRoom:'እዚ ክፍሊ እዚ ',
             soYouAreLookingFor:'ስለዚ ተናዲዩዎ ዘለኹም',
             writeWorkSummary:'ሓፈሻዊ መግለጺ ብዛዕባ ክስራሕ ደሊኹሞ ዘለኹም ስራሕ',
             exceedTheLimit:'ደረት ሓሊፉ',
             youAreLookingNow:'ሕጂ ትደልዩዎ ዘለኹም',
             telephone:'ቴለፎን',
             howLongDoesTheWorkTakes:'እቲ ስራሕ ንኽፍጸም ክንደይ ክወስድ ይኽእል',
             saveUpdate:'ዓቅብ',
             professionRegistration:'ምዝገባ ሞያ',
             generalSummaryAboutYou:'ሓፈሻዊ መብርሂ ብዛዕባኻ',
             mainProfession:'ቀንዲ ሞያ',
             yourWorkingPeriodIs:'ክትሰርሓሉ ትደሊ ዝግያት',
             IAmNow:'ኣብዚ እዋን እዚ',
             employees:'ሰራሕተኛታት',
             offline:'ኣብ መስመር የሎን',
             dateOfBirth:'ዕለተ ልደት',
             workToBeDone:'ክስራሕ ዘለዎ ዕዮ',
             sendMessageHere:'መልእክቲ ኣብዚ ስደድ',
             reply:'ነዚ ሓሳብ እዚ ርኢቶ ሃብ',
             writeSuggestion:'ርኢቶኻ ጸሓፍ',
             problemDescription:'መግለጺ ጉዳይ',
             postedOn:'ዝተጻሕፈሉ ግዜ',
             seeSuggestion:'ርኢቶታት ተመልከት',
             address:'ኣድራሻ',
             whoMaySolveThisProblem:'እዚ ጉዳይ እዚ ንመን ክምልከቶ ወይ ኣየናይ ሞያ ዘለዎ ሰብ ክፈትሖ ይኽእል ኢልካ ትግምት',
             idontknow:'ኣይፈለጥኩን',
             submitSuggestion:'ርኢቶ ኣረክብ',
             journeySchedules:'ናይ ጉዕዞ መደባት',
             transportType:'ዓይነት መጓዓዝያ',
             from:'ካብ',
             to:'ናብ',
             date:'ዕለት',
             code:'ኮድ',
             transportRegistration:'መጓዓዝያ ሃልያትካ ንኸተመዝግባ ',
             activeFromTo:'ትሰርሓሉ ካብ -ክሳብ',
             numberOfSeats:'ብዝሒ መናብር ወይ ቦታ ዘለዋ',
             additionalInfo:'ተወሳኺ ሓበሬታ',
             travelByTrainRegistration:'ጉዕዞ ብባቡር እንተለካ ንኽትምዝገብ ',
             registerToTravelByAnyTransport:'ብዝተፈላለያ ዓይነት መጓዓዝያ ክትጉዓዝ ምስትደሊ፥ ንኽትምዝገብ ',
             journeyDetails:'ናይ ጉዕዞ ሓበሬታ',
             registerHere:'ኣብዚ ተመዝገብ',
             by:'ብ',
             freeSpace:'ዘለዋ ናጻ ቦታ',
             fillYourTelephoneHereThenClick:'ተለፎንካ ኣእቱ ብድሕሪኡ ኣብዚ ክሊክ ግበር',
             filterHeadingsHere:'ኣርእስታት ኣብዚ ጸሓፍ',
             posted:'ዝጸሓፎ',
             postedBy:'ጸሓፊ',
             historyType:'ዓይነት ትንተና',
             title:'ኣርእስቲ',
             subTitle:'ትሕተ ኣርእስቲ',
             writeDetailsHereBelow:'ዝርዝራት መግለጺ ኣብዚ ታሕቲ ጸሓፍ',
             hereBelow:'ኣብዚ ታሕቲ',
             uploadImageOrVidio:'ስእሊ ወይ ቪድዮ ጸዓን',
             startNew:'ከምብሓዱሽ ጀምር +',
             addNewSubTitle:'ትሕተ ኣርእስቲ ወስኽ +',
             notification:'ሓበሬታታት',
             messages:'መልእኽቲ',
             seeDetails:'ዝርዝራት ሓበሬታ ብዛዕባ እዚ ሰብ ተዓዘብ',
             fullName:'ሙሉእ ስም',
             gender:'ጾታ',
             workDetails:'ናይ ስራሕ መግለጺታት',
             timeTaken:'ዝወስደሉ ግዜ',
             workSession:'ናይ ስራሕ እዋናት',
             travellingDate:'ትጎዓዘሉ ዕለት',
             transportChoosed:'ዝመረጽካያ ተጓዓዚት',
             employersAndEmployees:'ኣስራሕን ሰራሕተኛን',
             whoShouldRegisterAsEmployer:'መን ዩ ከም ኣስራሓይ ክምዝገብ ዘለዎ?',
             whoShouldRegisterAsEmployee:'መን ዩ ከም ስራሕተኛ ክምዝገብ ዘለዎ',
             employer:'ስራሕ ዘለዎም ሰባት ወይ ኣስራሕቲ',
             username:'መጠቀሚ ስም',
             password:'ቃላ ምስጢር',
             updateYourInformation:'ሓበሬታኹም፣ ሓበሬታኹም ከተመሓይሹ ውን ይከኣል ኢዩ።',
             selectProfileImage:'መጠቀሚ ቅድመ ስእሊ ኣብዚ ምረጽ',
             yourProfilePictureLooksLike:'መጠቀሚ ቅድመ ስእልኻ ከምዚ ኣብዚ ትሕት አልካ ዘሎ ስእሊ ትመስል',
             updateUserSettings:'ሓበሬታትካ ኣመሓይሽ',
             filterBy:'ከም መፍለዪ ክትጥቀመሉ ደሊኻ ዘለኻ ስም',
             saleThingsPost:'ዝሽየጡ ነገራት ዘመሓላልፍ',
             catagories:'ምድብ',
             price:'ዋጋ',
             where:'ኣበይ',
             description:'መግለጺ',
             uploadImage:'ስእሊ ኣመሓላልፍ',
             upload:'ኣመሓላልፍ',
             youHaveWorksToBeDone:'ዝዕየዩ ዕየታት ወይ ክትፍጽሞም ዘለካ ሞያነት ዝሓቱን ወይ ዘይሓቱን ዝስርሑ ነገራት ኣለዉኻ?',
             youAreLookingForProfessionals:'ስራሕካ ወይ ድልየታትካ ን ምፍጻም ሰብ ሞያ ተናዲ ኣለኻ?',
             youHaveProfession:'ሞያ ኣለካ?',
             youNeedToWork:'ክትሰርሕ ደሊኻ?',
             dailyLifeHappenings:'ዜናን ሓበሬታን',
             news:'ዜና',
             dictations:'እተባህለ',
             fictions:'ዛንታ',
             travelAndTravelSchedules:'ጉዕዞታትን ናይ ጉዕዞ ውጥናትን',
             writeNewsHere:'ትንታነታት ኣብዚ ጸሓፍ።ዜና፣ህተባህለታት፣ዛንታታ ኣብዚ ክንጽሕፍ ንኽእል።',
             backToRooms:'ናብ ካሎት ክፍልታት ተመለስ',
             problemsAndTheriSolutions:'ጉዳያትን ርኢቶታትን መፍትሒኦምን',
             reportHereIfYouHaveProblem:'ጉዳይ ተሊካ ኣብዚ ጸሓፍ. ጉዳይካ ኣካፍል',
             thingsToSale:'ዝሽየጡ ነገራት',
             userSettings:'ሓበሬታኹም',
             clickHere:'ኣብዚ ክሊክ ግበር',
             backToDailyLifeHomePage:'ናብ ቀንዲ ገጽ ናይ መዓልታዊ መነባብሮ ተመለስ',
             numberOfPeople:'ብዝሒ ተጓዓዝቲ',
             date:'ዕለት',
             youDontHaveProfessionButYouNeedToWork:'ሞያ የብልካን ግን ዝኾነ ዓይነት ስራሕ ክትሰርሕ ደሊኻ?',
             generalInformationAboutEmployerRegistration:'ሓፈሻዊ መግለጺ ስለምንታይ ከም ኣስራሕቲ ወይ ዕዮ ዘለዎም ሰባት ኮይና ክንምዝገም ዘድልየና?',
             whyEmployer:'ከም ኣስራሕቲ ኮይና ክንምዝገበሉ ዘድልየና መዳይ፣ ዝዕየ ዕዮ ምስዝህልወና እሞ ከኣ ሞያ ዘለዎ ሰብ ክኸውን ይኽእል ወይ ሞያ ዘይብሉ ሰብ ምስዘድልየና ከም ኣስራሕቲ ኮይና ክንምዝገብ ንኽእል።ነኣብነት ከም ኣብ ምህናጽ ዘድልዩ ጉልበታዊ ሓገዛት፣ከም ኣብ ምቱርጓም ዘድልዩ ክኢላታት ቋንቋ ከም ኣብ እዋን ጥዕናዊ ጸገማት ኣብ ምሕካም ዘድልዩና ኪኢላታት ሓካይም ወዘተ ምስ ዘድልየና ከም ኣስራሓይ ወይ ዕዮ ዘለዎ ሰብ ኮይና ክንምዝገም ንኻእል።ብሓፈሻ ኣብ ዝተፈላለየ መዳያትን እዋናትን ንደልዮ ዘለና ብ ሓደ ሞያ ዘለዎ ሰብ ወይ ሞያ ዘይብሉ ሰብ ውን ክኸውን ይኽእል ምስ ዘድልየና ከም ኣስራሓይ ተመዝጊብና ዝተፈላለዩ ሞያ ዘለዎም ከምኡ ውን ሞያ ዘይብሎም ንስራሕ ድሉዋት ዝኾኑ ሰባት ክንረክብን ብዛዕባ ስራሕና ምስኦም ክንዛራረብን ንኻእል።',
             listOfAllProfessionals:'ስራሕ ዝደልዩ',
             professionalRegistration:'ከም ደላዪ ስራሕ ኮይንካ ተመዝገብ',
             employerRegistration:'ከም ኣስራሓይ ወይ ሰራሕ ዘለዎ ሰብ ኮይንካ ተመዝገብ',
             listOfAllClients:'ኣስራሕቲ',
             save:'ዓቅብ',
             seeTravelInfo:'ጉዕዞ ተዓዘብ',
             delete:'ደምስስ',
             submit:'ኣረክብ',
             daysAgo:'ማዓልታት ይገብር',
             clientRegistration:'ናይ ኣስራሓይ ምዝገባ',
             passengerRemarks:'ናይ ተጓዓዛይ ተወሰኻኢ መብርሂ። ነኣብነት፥ ኣብዚ ትኽክል ዝኾነ ሙሉእ ስምን ኢማይልን ክተእትዉ ትኽእሉ',
             country:'ትነብረሉ ሃገር',
             ILiveOutSideNetherlands:'ካብ ነዘርላንድ ወጻኢ ዲኹም ትነብሩ ?',
             cityOrTown:'ትነብረሉ ከተማ ወይ ዓዲ',
             sendNewsText:'ጽሑፍ ስደድ',
             chooseCity:'ከተማ ምረጽ',
             mobileProblems:'ናይ ሞባይል ጸገም',
             computerProblems:'ናይ ኮምፑተር ጸገም',
             healthyProblems:'ናይ ጥዕናዊ ጸገም',
             others:'ካልእ',
             problemType:'ዓይነት ጸገም',
             notStatedHere:'ዝነብረላ ዘለኹ ዓዲ ኣብ ዝርዝር ኣስማት ኣይተጠቅሰቲን።',
             Settings:'ምምዕርራያት ሓበሬታኻ',
             createRoom:'ናይ ገዛእ ርእስኹም ክፍሊ ኣዳሉው',
             uploadFile:'ጸዓን',
             sendWorkRequest:'ናይ ስራሕ ሕቶ ሕተት',
             friendRequest:'ናይ ምሕዝነት ሕቶ ሕተት',
             wrongUserNameOrPassword:'መጠቀሚ ስም ወይ ቃለ ምስጢር ሓዲኡ ተጋጊኹም ኣለኹም ካልኣይ ፈትኑ ወይ <br> ሓደስቲ ተኾይንኩም መጠቀሚ ስም ኣውጽኡ ኣብዚ ታሕቲ ኣለኩም።',
             alreadyHaveAccount:'ኣካውንት ኣለኩም? ናብ መእተዊ ተመለሱ።',
             register:'መመዝገቢ',
             signup:'ኣካውንት የብልካን ? ኣብዚ ተመዝገብ።',
             successfullyRegistered:'ተመዝጊብኩም ኣለኹም። ምሳና ብምምዝጋብም ኣዚና ነመስግን።<br> ምስዚ ስራሕና ሕጉሳት ክትኮኑ ከኣ ተስፋና ኢዩ።',
             gettingAjob:'ስራሕ ክትሓትት፡ ምስ ዘለካ ክእለት ዝኸይድ ስራሕ ከተናድን ክትረክብን ትኽእል።',
             postingAjob:'ዝዕየ ስራሕ ምስዝህልወካ ዝዓየልካ ሰብ ንምርካብ ስራሕካ ክትልጥፍ ትኽእል።ኣብዚ ክሊክ ግበር።',
             gettingBestCandidate:'ንዕዮኻ ክሰርሕዎ ይኽእሉ ኢዮም ዝበልካዮም ሰራሕተኛታት <br> ክትረክብን ንኽሰርሑልካ ክትውከሶምን ትኽእል።',
             gettingAjobWithNoProfession:'ዋላ ሞያ ኣይሃልኻ ኣብ ሞያ ዘየድልዮ ስራሕ ክትረክብ ትኽእል ወይ ከተናዲ ውን ትኽእል <br>መኽንያቱ ሞያ ዘየድልዮም ስራሓት ውን ኣብዚ ስለዝልጠፉ።ኣብዚ ክሊክ ግበር።',
             postingIssues:'ዘለካ ጉዳይ ክትልጥፍ ወይ ንበዓል ሞያ ክትውከስን ትኽእል ንጉዳይካ ከኣ ፍታሕ ክትረኽበሉ ትኽእል።ኣብዚ ክሊክ ግበር።',
             gettingNews:'ኣዋናውያን ዜናታት ከምኡ ውን ዝተፈላለዩ ጽሑፋትን ታሪኻትን ከተንብብ ትኽእል።',
             privateChatsAndGroupChats:'ብሕታዊ ዝርርባት ብ ጽሑፍ ክትሰድድ ትኽእል ከምኡ ውን ብ እኩብ ውን ክትዘራረብ ትኽእል።',
             postingHobies:'ዝተፈላለዩ ደስ ዝብሉኻ ነገራት ወይ ጽሑፋት ክትልጥፍ ትኽክል።<br>ካብ የዕሩኽ መሓዛ ድማ ርኢቶታት ክትረክብ ትኽእል።',
             gettingItemsToSale:'#ዝሽየጡ ነገራት ውን ክትረክብ ትኽእል።',
             journeySchedules:'ናይ ጉዕዞ መደባት ክትሕንጽጽ ትኽእል።',
             searchAjob:'ስራሕ ድለ',
             yourPreviousChoosen:'መሪጽኩሞ ዝነበርኩም ፥ ',
             subWorkIsCatagorizedUnder:'መሪጽኩሞ ዝነበርኩም ንኡስ ምድባት፥',
             userSetting:'ምምዕርራይ መጠቀሚ ሓበሬታ',
             userProfile:'መጠቐሚ ስእሊ ቀይር ወይ ኣእቱ',
             userPosts:'ተጠቓማይ ፖስት ዝገበሮም ፖስትታት',
             registerEmployerIf:'ከም ኣስራሓይ ክትምዝገብ ተኾይንካ ካብዞም ዝስዕቡ ሓደ ከተማልእ ኣለካ።',
             registerEmployeeIf:'ከም ደላዪ ስራሕ ክትምዝገብ ተኾይንካ ካብዞም ዝስዕቡ ከተማልእ ኣለካ።',
             roomOwner:" ይበሃል",
             yourhelplabdotcom:'YOUR HELP LAB',
             seeMoreMessages:'ተወሳኺ ዝተሰደ መልአኽቲ',
             aboutUser:'ብዛዕባ ዚ ሰብ ዚ',
             seeMoreNotifications:'ተወሳኺ ሓበሬታታት',
             seeMoreFriendRequest:'ተወሳኺ ናይ ንምሕዝነት ዝሓተቱ',
             professionalOnlineStatus:'ሕጂ ኣብ መስመር ኣለዉ',
             mainProfessionHomePage:'ሞያ',
             city:'ከተማ',
             getNewsAtHomePage:'ዜናታት ድለ',
             backtosearchHomepage:'ናብ ናይ መጀመርያ ገጽ ተመለስ',
             searchOnHomepage:'ደለ',
             getItemForSaleHomepage:'ዝሽየጡ ነገራት ድለ',
             homePageInfo:'እንቛዕ ብደሓን መጻኹም።እዚ ወብሳይት ዚ  ብዛዕባ ስራሕን ዕድላት ስራሕን ምርካብን ምድላዪን ይነጥፍ ። ጠመተና ምርኻብ ክሰርሑ ዝኽእሉ ሰባት ምስ ከስርሑ ዝኽእሉ ሰባትን ኢዩ።ኣብ ዚ ዋላ ውን ሞያ ዘይብሎም ሰባት ኣብ ሞያ ዘይድልዩ ስራሓት ብምስራሕ ዕድላት ስራሕ ክንከፍተሎም ንኽእል።ብካልእ ወገን ውን እዋናዊ ዝኾኑ ሓበሬታታት ብዛዕባ ስራሕን ካልእን ንህብ።ኣብዚ ታሕቲ ዘለው ዝርዝራት ገለ ገለ ጥቅምታትና ስለዝኾኑ ኣብ ነፍሲ ወከፎም ክሊክ ብምግባር ክትጥቀሙሎም ንላቦ።',
             contactus:'ኣብዚ ርኸቡና',
             aboutus:'ብዛዕባ ዚ',
             gotohomepage:'ናብ ናይ መጀመሪ ገጽ ኪድ',
             gotologinpage:'ናብ መእተዊ ገጽ ኪድ',
             websiteAddress:'መወከሲ ኣድራሻ ወይ ወብሳይት',
             chooseProfession:'ሞያ ምረጽ/ቀይር',
             changeWorkTime:'ናይ ስራሕ ግዜኹም ኣስፍሩ/ቀይሩ',
             situation:'ከነታትኩም ኣብዚ እዋን እዚ',
             chooseProfessions:'ሞያ ምረጽ',
             chooseCountry:'ሃገር ምረጽ',
             chooseCity:'ከተማ ምረጽ',
             buy:'ግዛእ',
             cancel:'ሰርዝ',
             buyThingsPost:'ዝርዝር ሓቤረታ',
             itemName:'ስም ናይ ስሽየጥ ነገር',
             unit:'ባጤራ',
             getBoughtItems:'ንምዕዳግ ዝተመርጹ ኣቕሑ',
             backToSalePage:'ናብ ናይ መሸጣ ገጽ ተመለስ',
             numberOfItems:'ብዝሒ',
             amount:'ብዝሒ',
             firstName:'ስም',
             middelName:'ስም ኣቦ',
             surName:'ስም ኣባሓጎ/መጸውዒ ስድራቤት',
             postCode:'ፖስት/ዚፕ ኮድ',
             houseNumber:'ቁጽሪ ገዛ',
             street:'ጎደና',
             addressInfo:'ሓበሬታ ናይ ኣድራሻ',
             buyerInfo:'ናይ ገዛኣይ ሓበሬታ',
             total:'ድምር',
             action:'ክትግበሩ ዝኽእሉ ኣክሽናት',
             chatWithSupplier:'ምስ ሸያጣይ ተዘራረብ ብዛዕብባ እዚ',
             size:'መዐቐኒ',
             newpassword:'ሓዲሽ ቓለ ምስጢር',
             changePassword:'ቓለ ምስጢር ቀይር',
             change:'ቀይር',
             BackToLogin:'ናብ ናይ መእተዊ ገጽ ተመለስ',
             forgetPassword:'ቃለ ምስጢርኩም ረሲዕኩሞ ዲኹም? ረሲዕኩሞ ተኾይንኩም ኣብዚ ሕተቱ',
             professionalMotivation:'ናይ ሰራሕተኛ ምትብባዕ ወይ ተወስኺ ሓበሬታ ርአ',
             backtosearchHomepage:'ናብ ናይ መጀመሪ ገጽ ተመለስ',
             backToClientsList:'ናብ ዓማዊል ተመለስ',
             backToProfessionalsList:'ናብ ሰራሕተኛታት ተመለስ',
             employeeClient:'(ሰራሕተኛ)',
             employerClient:'(ዝስራሕ ዘለዎ ሰብ)',
             request:'ሕተት',
             chatWithTransportOwner:'ምስ ወናኒ ተዘራረብ',
             passengerRemarks:'ተወሳኺ ክትብሎ ትደሊ',
             getAllAcceptedRequests:'ሓቲቶም ዝተቐበልኩሞም ሰባት',
             getAllRequests:'ዝሓተቱ ሰባት',
             whoAcceptedMe:'መን ንሕቶይ ተቐቢሉዎ',
             registerFormInvalid:'ዘይቅቡል መመዝገቢ ቕጥዒ',
             fromTime:'ካብ ግዜ',
             toTime:'ክሳብ ግዜ',
             getInTouchWithUs:'ርኸቡና',
             gotopayment:'ናብ መኽፈሊ',
             next:'ዝቕጽል',
             writeWorkDetails:'ስራሕ ብዝርዝር ግለጽ',
             jobSearch:'ስራሕ ምድላይ',
             searchCandidate:'ሰራሕተኛ ምድላይ',
             jobPosts:'ስራሕ ምልጣፍ',
             issuePost:'ጉዳያት ምልጣፍ',
             journey:'ናይ ጉዕዞ ውጥን',
             getNews:'ዜናታትን ሓበሬታታትን',
             itemsForSale:'ዝዕደጉ ነገራት',
             getJobDesc:"ብዝተፈላለዩ ሞያታት መሰረት ኣብ ዝተፈላለያ ከተማታት ዘሎ ስራሕ ክትረክብ ትኽእል።",
             getEmployeeDesc:"ዝተፈላለዩ ሰራሕተኛታት በብሞዩኦም ኣብ ዝተፈላለዩ ከተማታት ንዝነብሩ በብ ከተማ ዝቅመጥሉ ክትረክብ ትኽእል።",
             postJobDesc:"ስራሕ ሃልዩካ ሰራሕተኛ ተናዲ ተሊኻ ስራሕ ክትልጥፍ ትኽእል።.",
             getNewsDesc:"እዋናውያን ዜናታትን ታሪኻትን ከምኡ ውን እዋናውያን ዝኾኑ ብዝዕባ ስራሓትን ዕድላት ስራሓትን ከተንብብን ትኽእል",
             getItemsToSaleDesc:"ዝሽየጡ ነገራት ክትረክብ ትኽእል።.",
             noProfessionDesc:"ሞያ ምስዘይህልወካ ውን ኣብ ሞያ ዘየድልዮ ስራሓት ክትረክብ ትኽእል።",
             postingIssueDesc:"ዝኾነ ጉዳያት ከም ናይ ስራሕ ጸገማት ወይ ካልእ ምስዝህልወካ ፖስት ክትገብር ትኽእል ብኣና ወገን ከኣ ተሓጋገዝቲ  ሰባት በቲ ዘለካ ጉዳይ ዘለዎም ሞያ ወይ ኣፍልጦ ዘለዎም ሰባት ምኽሪ ከምዝህቡኻ ንገብር።",
             chatDesc:"ምስ ኣዕርኹ መሓዛ ዝርርብ ብ ስቱር ወይ ከኣ ብ እኩባት ሰባት ዝርርብ chat ክትገብር ትኽእል።",
             postHobbiesDesc:"ዘለካ ሓሳባት ብዛዕባ ስራሕ ክኸውን ይኽእል  ፖስት ክትገብር ትኽእል።.",
             journeyDesc:"ጉዕዞ ምስ ዝህልወካ ውጥን ክትገብር ትኽእል",
             profPlaceHolder:'ሞያ',
             countryPlaceHolder:'ሃገር',
             cityPlaceHolder:'ከተማ',
             transportRegistrationAdvice:'መኪና ኣለትካ?ክትሰርሓላ ወይ ንእግረ መንገድኻ ሰብ ክትመላኣላ ትኽእል ኢኻ ።ነዚ ክትገብር መጀመርያ ከተመዝግባ ኣለካ ብድሕሪኡ ኣብ online ምስሃለወት ሰብ ክርኢያን ምሳኻ ንኽጎዓዙ ክሓቱኻን ንስኻ ውን ናይ ምቅባልን ምንጻግን መሰል ክህልወካ ኢዩ።ተጎዓዛይ ተኾይንካ ውን መካይን ወይ ካልእ መጓዓዝያታት ንኽትረክብ ክትምዝገብ ኣለካ።ዝኾነ ካልእ ጉዳይ ምስ ዝህልወኩም ግን ኣብ ላዕሊ መልእኽቲ ብምስዳድ ክትረኽቡና ትኽእሉ።',
             journeyByPlane:'ጉዕዞ ብ ነፋሪት <br> ጉዕዞ ብ ነፋሪት ኣለኩም ?ጽቡቅ እምበኣር ኣብዚ ብሕሱር ቲኬት ክንረኽበልኩም ንኽእል።መጀመርያ ግን ኣብዚ ስምኩምን ተለፎንኩምን ጸሓፉ ብድሕርኡ  ንዝሓሸ መንገዲ ጉዕዞኹም ዝምልከት ንኽንመያየጥ ኣብዚሓጸረ እዋን ክንድውለልኩም ኢና ።ሕጂ ግን ኣብዚ ትሪኢዎ ዘለኹም ቦታ ብውሑዱ ተለፎንኩም ጽሒፍኩም ኣብ ስደድ ዝብል ዘሎ መልጎም ጠውቑ ሞ ብድሕሪኡ ባዕልና ክንድውለልኩም ኢና።',
             sendMoney:'ገንዘብ ናብ ኤርትራ ብሕጋዊ መንገዲ ምስዳድ <br>ገንዘብ ናብ ኤርትራ ብሕጋዊ ክትሰዱ ደሊኹም? ጸገም የለን ኣብዚ እዋን ዚ ገንዘብ ምስዳድ ን ኤርትራ ብ ጸሊም ይኹን ብ ሕጋዊ ኩሉ ማዕረ ስለዝኾነ ካብሎሚ ብሕጋዊ ገንዘብ ክትሰዱ ከምትኻሉ ክንሕብረኩም ንፈቱ ።እምባኣር ነዚ ንምግባር ተለፎንኩም ኣብዚ ጸሓፉ እሞ ባዕልና ክንረኽበኩም ኢና ብኸመይ ይኸውን ከኣ ከነዘራርበኩምን ክንገልጸልኩምን ኢና።እምበኣር መልእኽትኹም ብፍላይ ከኣ ተለፎንኩም ጸሒፍኩም ኣብ ስደድ ዝብል ዘሎ መልጎም ጠውቑ ሞ ብድሕሪኡ ባዕልና ክንረኽበኩም ኢና።',
             passengers:'ተጎዓዝቲ',
             transports:'ኣብዚ ቦታ ዚ በዚ ዝመረጽኩሞ ዕለት ተመዝጊበን ዘለዋ መጓዓዝያታት',
             writeCityNameWhereULive:'ትነብሩላ ከተማ ኣብዚ ጸሓፉ',
             travelByMeansOfTransport:'ሓበሬታ መጓዓዝያታት',
             uploadTransportImage:'ናይ መጓዓዝያ ስእሊ',
             itemImage:'ናይ ንብረት ስእሊ ኣብዚ ታሕቲ የእትው።',
             itemWillBeLookingLikeThis:'ንብረት ብ ኸምዚ ክርአ ኢዩ።',
               addSaleItemButton:'ናብ መዐቀቢ የእቱ',
             itemAmount:'ብዝሒ ናይዚ ዓይነት ነብረት ዚ',
             itemSize:'ዓቐን ንብረት ብ ኪግ፣ሜትሮ፣ጽምዲ...ወዘተ',
             newItemToSaleButton:'ሓዲሽ ንብረት መዝግብ',
             addItemToSale:'ዝሽየጥ ንብረት እንተልዩኩም ኣብዚ የእትዉ',
            backToSaleHomePage:'ናብ መሸጢ ቦታ ተመለስ',
             newsPageIntro:'ምንጪ ዜናን ሓበሬታን ፣ታሪኻት ዝንበብሉን ከምኡ ውን ምኽርታትን ዝርርባትን ኣብ መንጎ ሰባት ን ዝሓሸ ፍታሕ ዝዓለመ።',
             travelPageIntro:'ጉዕዞ ኣለካ?እዚ እምበኣር ናይ ጎዕዞን ምስ ጉዕዞ ዝተኣሳሰሩ መሳለጥያታት ዝህቡ ነገራት ሓበሬታ ኣብ ምሃብ ይነጥፍ።',
             salePageIntro:'ዝግዛእ ኣለካ?እምበኣር ኣብዚ ዝግዝኡ ዝተፈላለዩ ዓይነት ንብረታት ክትረክብ ትኽእል'
        

          });
          $translateProvider.preferredLanguage('EN');
    });
/* chat Services */
        myApp.factory('socket', function ($rootScope) {
          var socket = io.connect();
          return {
            on: function (eventName, callback) {
              socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                  callback.apply(socket, args);
                });
              });
            },
            emit: function (eventName, data, callback) {
              socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                  if (callback) {
                    callback.apply(socket, args);
                  }
                });
              })
            }
          };
        });
//scroll scroll bar to bottom when sending a message
    myApp.directive('onFinishRender', function($timeout) {
        return {
            restrict : 'A',
            link : function(scope, element, attr) {
                if (scope.$last === true) {
                    $timeout(function() {
                        $('#promptAnswerBlock').scrollTop($('#promptAnswerBlock')[0].scrollHeight + 150);
                    });
                }
              }
        }
    });

//scroll to bottom directive
   myApp.directive('onScrollToBottom', function ($document) {
        //This function will fire an event when the container/document is scrolled to the bottom of the page
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var doc = angular.element($document)[0].body;
                $document.bind("scroll", function () {
                    if (doc.scrollTop + doc.offsetHeight >= doc.scrollHeight) {
                        //run the event that was passed through
                        scope.$apply(attrs.onScrollToBottom);
                    }
                });
            }
        };
    });
//on enter
   myApp.directive('onEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.onEnter);
                });

                event.preventDefault();
            }
        });
    };
});
//login controller
    myApp.controller('logincontroller',function($scope,$http,$window,srvShareData, $location,alertService,$translate,countryRetriever,cityRetriever,professionRetriever,loginDirectoryLeader){
            $scope.loginClickedFrom=loginDirectoryLeader.getData();
            $scope.onClickLoginFromHomePage=function(){
              var directory="/jobFinder/home/"
              loginDirectoryLeader.addData(directory)
            }
            $scope.onClickLoginIssuePosting=function(){
              var directory="/jobFinder/issues/"
              loginDirectoryLeader.addData(directory)
            }
            $scope.onClickLoginJobPosting=function(){
              var directory="/jobFinder/professionalTransactions/"
              loginDirectoryLeader.addData(directory)
            }
            $scope.username="";
            $scope.password="";
            $scope.dataToShare = [];
              $scope.fillCountry = function(){
                var data=null
                  var dataPromise = countryRetriever.getCountry($scope.country);
                    $scope.datas=null;
                    dataPromise.then(function(data){
                    $scope.countryDatas = data;
                   });
               }
               $scope.fillCity = function(){
                   var data=null
                   if($scope.country==null){
                     alert("enter country first")
                   }else if($scope.selectedCountry==undefined){

                   }else{
                     var dataPromise = cityRetriever.getCity($scope.city,$scope.selectedCountry);
                       $scope.datas=null;
                       dataPromise.then(function(data){
                       $scope.cityDatas = data;
                      });
                   }
                }
                $scope.fillCityAtRegistration = function(){
                    var data=null
                   if($scope.countrySelectionAtRegistration==undefined){
                      alert("select country")
                    }else{
                      var dataPromise = cityRetriever.getCity($scope.city,$scope.countryDatas);
                        $scope.datas=null;
                        dataPromise.then(function(data){
                        $scope.cityDatas = data;
                       });
                    }
                 }
                $scope.fillProfession = function(){
                    var data=null
                    var dataPromise = professionRetriever.getProfession($scope.profession,$scope.languageKey);
                      $scope.datas=null;
                      dataPromise.then(function(data){
                      $scope.professionDatas = data;
                     });
                 }
               $scope.countrySelection = function(suggestion){
                 $scope.selectedCountry=suggestion
               }
               $scope.citySelection = function(suggestion){
                 $scope.selectedCity=suggestion
                 var searchCriteria={}
                 searchCriteria.profession=$scope.selectedProfession;
                 searchCriteria.country=$scope.selectedCountry;
                 searchCriteria.livesIn=$scope.selectedCity;
                 searchCriteria.languageKey=$scope.languageKey;
                 if($scope.selectedProfession==null){
                   jobAlertLanguage();
                 }else if($scope.selectedCountry==null){
                   jobAlertLanguage();
                 }else if($scope.selectedCity==null){
                   jobAlertLanguage();
                 }else{
                   $http.post('/insertExternalData',searchCriteria).then(function(response){
                    $scope.disableSearch=false;
                   })
                 }
               }
               $scope.professionSelection = function(suggestion){
                 $scope.selectedProfession=suggestion
               }
               $scope.forgetPasswordForm=function(){
                 $scope.forgetPassword=!$scope.forgetPassword;
                 $scope.LoginBox=!$scope.LoginBox;
               }
               $scope.backToLogin=function(){
                 $scope.forgetPassword=!$scope.forgetPassword;
                 $scope.LoginBox=!$scope.LoginBox;
               }
               $scope.checkUserInDatabase=function(name,username,email){
                 var userinfo={}
                 userinfo.name=name;
                 userinfo.username=username;
                 userinfo.email=email
                 $http.post('/getUserInfoForForgetpassword',userinfo).then(function(response){
                   $scope.userInfoResults=response.data;
                   if($scope.userInfoResults=='error' || $scope.userInfoResults=='nouser'){
                     if($scope.languageKey=='EN'){
                       $scope.noSuchUser="no such user.You may have entered wrong email ,user name or your full name.Please try again.";
                     }else if($scope.languageKey=='TG'){
                       $scope.noSuchUser="kemzi aynet metekemi sm yelen";
                     }else if($scope.languageKey=='NL'){
                       $scope.noSuchUser="niet zo'n gebruiker. Mogelijk hebt u een verkeerd e-mailadres, gebruikersnaam of uw volledige naam ingevoerd. Probeer het opnieuw";
                     }else{
                       $scope.noSuchUser="no such user.You may have entered wrong email ,user name or your full name.Please try again.";
                     }

                   }else{
                     $scope.noSuchUser=''
                     $scope.newPassword=!$scope.newPassword;
                     $scope.userIdForForgetpassword=response.data[0].id
                   }
                 })
               }
               $scope.passwordChange=function(id,newpassword,username){
                 var changePasswordInfo={}
                 changePasswordInfo.id=id;
                 changePasswordInfo.password=newpassword;
                 changePasswordInfo.username=username;
                 $http.post('/changePassword',changePasswordInfo).then(function(response){
                   $scope.passwordHasChanged=response.data
                 })
               }
            //send contact message
            function errorsOnContactFields(){
              if($scope.languageKey=='TG'){
               if($scope.name==null){
                  $scope.errorMessage="ስም ምልኡ"
                }else if($scope.email==null){
                   $scope.errorMessage="ኢመይል የእትዉ";
                }else if($scope.tele==null){
                    $scope.errorMessage="ተለፎንኩም የእትዉ";
                }else if($scope.message==null){
                  $scope.errorMessage="መልእኽቲ ጸሓፉ";
                }else{
                  $scope.errorMessage="NoErrors"
                }
              }else if($scope.languageKey=='NL'){
                if($scope.name==null){
                $scope.errorMessage="Vul uw naam in"
                }else if($scope.email==null){
                   $scope.errorMessage="Vul uw email in";
                }else if($scope.tele==null){
                    $scope.errorMessage="Voer je telefoonnummer in";
                }else if($scope.message==null){
                  $scope.errorMessage="Schrijf een bericht";
                }else{
                  $scope.errorMessage="NoErrors"
                }
              }else{
                if($scope.name==null){
                  $scope.errorMessage="Enter your name"
                }else if($scope.email==null){
                   $scope.errorMessage="Enter your email";
                }else if($scope.tele==null){
                    $scope.errorMessage="Enter your telephone number";
                }else if($scope.message==null){
                  $scope.errorMessage="Write a message";
                }else{
                  $scope.errorMessage="NoErrors"
                }
              }
            }
            $scope.send=function(){
               errorsOnContactFields();
                  var data={}
                  data.name=$scope.name;
                  data.email=$scope.email;
                  data.tele=$scope.tele;
                  data.message=$scope.message;
                  if($scope.errorMessage=="NoErrors"){
                       $http.post('/contactus',data).then(function(response){
                        $scope.sendSuccess=response.data
                        $scope.errorMessage="";
                     })
                  }
            }
             $scope.toggle_register = function() {
                  $scope.RegisterBox = !$scope.RegisterBox
                 $scope.LoginBox = !$scope.LoginBox;
              };
              $scope.toggle_searchJob=function(){
                 $scope.candidate=false;
                 $scope.HomePageContent=true;
                 $scope.searchBox=true;
              }
              $scope.toggle_homePage=function(){
                 $scope.candidate=false;
                 $scope.HomePageContent=false;
                 $scope.searchBox=false;
              }
            $scope.searchAjob=function(){
                 var searchCriteria={}
                 searchCriteria.profession=$scope.selectedProfession;
                 searchCriteria.country=$scope.selectedCountry;
                 searchCriteria.livesIn=$scope.selectedCity;
                 searchCriteria.languageKey=$scope.languageKey;
                 if($scope.selectedProfession==null){
                   jobAlertLanguage();
                 }else if($scope.selectedCountry==null){
                   jobAlertLanguage();
                 }else if($scope.selectedCity==null){
                   jobAlertLanguage();
                 }else{
                   $http.post('/getjob',searchCriteria).then(function(response){
                     if(response.data.length==0){
                     noResults();
                     $scope.searchedData=""
                     $scope.searchedDataFromExternal="";
                     $scope.getExternalWorkInfo();
                     }else{
                        $scope.noResult=""
                        $scope.searchedData=response.data
                        $scope.getExternalWorkInfo();
                     }
                   })
                 }
            }
            $scope.getExternalWorkInfo=function(){
              var searchCriteria={}
              searchCriteria.profession=$scope.selectedProfession;
              searchCriteria.country=$scope.selectedCountry;
              searchCriteria.livesIn=$scope.selectedCity;
              searchCriteria.languageKey=$scope.languageKey;
              $http.post('/getExternalWorks',searchCriteria).then(function(response){
                if(response.data.length==0){
                   noResults()
                   $scope.searchedDataFromExternal=""
                }else{
                    $scope.searchedDataFromExternal=response.data
                    $scope.noResult=""
                }
              })
            }
            function noResults(){
              if($scope.languageKey=='TG'){
                $scope.noResult="ውጽኢት የለን።ብ ካልእ ከተማ ፈትኑ።ንዝያዳ ኣገልግሎት ተመዝገቡ ።ምምዝጋብ ምጥቃምን ብነጻ ኢዩ።";
              }else if($scope.languageKey=='NL'){
                $scope.noResult="Geen resultaten bedankt voor uw bezoek.";
              }else{
                $scope.noResult="No results thank you for visiting us.";
              }
            }
            $scope.professionalMotivation=function(id){
              $scope.professionalList=!$scope.professionalList;
              var professionalData={}
              professionalData.id=id;
              professionalData.languageKey=$scope.languageKey
              $http.post('/getProfessionalMotivation',professionalData).then(function(response){
                $scope.motivation=response.data[0].remarks
              })
            }
            $scope.backToProfessionalsList=function(){
              $scope.professionalList=!$scope.professionalList;
            }
            $scope.backToClientsList=function(){
               $scope.showWorkDetails=!$scope.showWorkDetails
            }
            $scope.getWorkDetails=function(id){
              $scope.workDetails="";
                var clientInfo={}
                clientInfo.id=id;
                clientInfo.languageKey=$scope.languageKey;
                $http.post('/getClientWorkDetails',clientInfo).then(function(response){
                  $scope.workDetails=response.data[0].workDetails;
                })
            }
            $scope.getWorkDetailsFromExternal=function(id,linkId,websiteLink){
              if($scope.languageKey=='TG'){
                alert("ተወሳኺ ሓበሬታ ምስ ትደልዩ ምምዝጋብ ከድልየኩም ኢዩ።ምስትምዝገቡ ብዙሕ ጥቅምታት ክትረኽቡ ትኽእሉ ኢኹም።")
              }else if($scope.languageKey=='NL'){
                alert("als u meer wilt weten, kunt u zich bij ons registreren. We hebben veel leuke dingen")
              }else{
                alert("if you need details please register with us.We have alot of funs")
              }
            }
            $scope.getNews=function(){
               $scope.showNews=!$scope.showNews
                var getNewsListdata={}
                    getNewsListdata.webCollectionId='news'
                    alertService.getWebCollections(getNewsListdata).then(function(response){
                        $scope.newsItems=response.data
                    })
            }
            $scope.getNewsData=function(){
                  var data={}
                data.historyType=$scope.newsList.Id
                    $http.post('/jobFinder/allNewsAtHomePage',data).then(function(response){
                    $scope.allNewsInfo=response.data
                  })
            }
           $scope.saleThings=function(){
            $scope.showsalethings=!$scope.showsalethings
           }
            $scope.getItemForSale=function(){
               $http.post('/jobFinder/postThingsForSaleOnHomePage').then(function(response){
                 $scope.alldata=response.data
               })
            }
            $scope.findCandidate=function(){
              $scope.HomePageContent=true;
              $scope.candidate=true;
              $scope.searchBox=false;
            }
        function jobAlertLanguage(){
          if($scope.languageKey=='TG'){
            if($scope.selectedProfession==null){
              alert("ሞያ ምረጹ")
            }else if($scope.selectedCountry==null){
              alert("ሃገር ምረጹ")
            }else if($scope.selectedCity==null){
              alert("ከተማ ምረጹ")
            }
          }else if($scope.languageKey=='NL'){
            if($scope.selectedProfession==null){
              alert("kiez beroep")
            }else if($scope.selectedCountry==null){
              alert("kiez land")
            }else if($scope.selectedCity==null){
              alert("kiez stad")
            }
          }else {
            if($scope.selectedProfession==null){
              alert("please select profession")
            }else if($scope.selectedCountry==null){
              alert("select country")
            }else if($scope.selectedCity==null){
              alert("select city")
            }
          }
        }
            $scope.searchAprofessional=function(){
                   var data={};
                     data.profession=$scope.selectedProfession;
                     data.country=$scope.selectedCountry;
                     data.livesIn=$scope.selectedCity;
                     data.languageKey=$scope.languageKey
                     if($scope.selectedProfession==null){
                       jobAlertLanguage()
                     }else if($scope.selectedCountry==null){
                       jobAlertLanguage();
                     }else if($scope.selectedCity==null){
                       jobAlertLanguage();
                     }else{
                       $http.post('/listOfprofessionalsAccordingUserCriteriaAtHomePage',data).then(function(response){
                         if (response.data.length==0) {
                          noResults();
                          $scope.listOfAllWorkers="";
                         }else {
                           $scope.noResult=""
                           $scope.listOfAllWorkers=response.data
                         }
                       })
                     }

            }

            $scope.toggle_login = function() {
                $scope.LoginBox = !$scope.LoginBox;
                $scope.RegisterBox = !$scope.RegisterBox
            };
             $scope.changeLanguage = function (langKey) {
                $scope.languageKey=langKey;
                $translate.use(langKey);
              };
              function getUserGender(){
                   var genderInfo={}
                    genderInfo.webCollectionId='gen'
                    alertService.getWebCollections(genderInfo).then(function(response){
                        $scope.userGenderModel=response.data
                        console.log("user gender "+$scope.userGenderModel)
                    })
              }
              getUserGender();
            $scope.submitLogin=function(){
                $scope.loginInfo={
                  username:$scope.username,
                  password:$scope.password
                }
                $http.post('/login',$scope.loginInfo).then(function(response){
                    var logedIn=response.data.logedIn
                    if(logedIn==true){
                          $scope.Authenticate=response.data.token;
                          var userId=response.data.result.userId
                          var userFullName=response.data.result.userFullName
                          var photo=response.data.result.photo;
                          var clientId=response.data.result.clientId
                          var professionalId=response.data.result.professionalId
                          var token=response.data.token
                          var permission=response.data.result.permission
                          var results=[];
                          var selectedLanguageKey=$scope.languageKey;
                          var country=response.data.result.country;
                          var livesIn=response.data.result.livesIn;
                          results.push(userId,userFullName,photo,clientId,professionalId,token,permission,selectedLanguageKey,country,livesIn)
                          $scope.dataToShare=results
                          srvShareData.addData(results)
                          var data={};
                          data.username=$scope.username;
                          data.password=$scope.password;
                          var directory=$scope.loginClickedFrom
                          $http.get(directory+userFullName).then(function(response){
                            $window.location.href = directory+userFullName
                          })
                    }else{
                        $scope.LoginAlert=true;
                    }
                })
            }
            function age() {
                var todayDate =$scope.userBirthDate;
                    var birthDateYear = todayDate.getFullYear();
                    var todayMonth = todayDate.getMonth();
                    var todayDay = todayDate.getDate();
                    var today=new Date()
                    var todayYear=today.getFullYear();
                    var myage = todayYear-birthDateYear;
                    if(myage<15){
                      alert("you are under age")
                    }else{
                      alert("you are over age")
                    }
            };
          function registrationFieldsChecker(){

                if ($scope.languageKey=='TG'){
                    $scope.fieldChecker="";
                  if ($scope.name==undefined){
                    $scope.unfilledFields="ስም የእትዉ";
                    $scope.fieldChecker="no filled";
                  }else if ($scope.username===undefined){
                  $scope.unfilledFields="መጠቀሚ ስም የእትዉ";
                    $scope.fieldChecker="no filled";
                  }else if ($scope.email==undefined){
                      $scope.unfilledFields="ኢመይልኩም የእትዉ"
                      $scope.fieldChecker="no filled";
                  }else if ($scope.password==undefined){
                    $scope.unfilledFields="ቃለ ምስጢር የእትዉ"
                    $scope.fieldChecker="no filled";
                  }else if ($scope.password!=$scope.password2){
                    $scope.unfilledFields="ዘእተኹሞ ቃለ ምስጢር ምስ ካልኣይ ግዜ ዘእተኹሞ ቃለ ምስጢር ሓደ እይኮነን"
                    $scope.fieldChecker="no filled";
                  }else if ($scope.userBirthDate==undefined){
                     $scope.unfilledFields="ዕለተ ልደት የእትዉ";
                     $scope.fieldChecker="no filled";
                  }else if ($scope.userGender===undefined){
                  $scope.unfilledFields="ጾታ ምረጹ";
                    $scope.fieldChecker="no filled";
                   }else if ($scope.selectedCountryOnRegistration ===undefined){
                    $scope.unfilledFields="ትነብሩሉ ሃገር ምረጹ"
                    $scope.fieldChecker="no filled";

                  }else if ($scope.notStatedHere==true){
                      if($scope.city===undefined){
                      $scope.unfilledFields="ትነብሩሉ ዓዲ ወይ ከተማ የእትዉ"
                        $scope.fieldChecker="not filled";
                      }
                  }else if ($scope.notStatedHere==false || $scope.notStatedHere==undefined){
                     if ($scope.selectedCityOnRegistration==undefined){
                       $scope.unfilledFields="ትነብሩሉ ከተማ ምረጹ"
                       $scope.fieldChecker="not filled";
                     }
                  }else{
                    $scope.fieldChecker="allFieldsAreFilled";
                  }
                }else if ($scope.languageKey=='NL'){
                    $scope.fieldChecker="";
                  if ($scope.name==undefined){
                    $scope.unfilledFields="Voer naam in";
                    $scope.fieldChecker="no filled";
                  }else if ($scope.username===undefined){
                    $scope.unfilledFields="Vul je gebruikersnaam in";
                    $scope.fieldChecker="no filled";
                  }else if ($scope.email==undefined){
                      $scope.unfilledFields="Voer email in"
                      $scope.fieldChecker="no filled";
                  }else if ($scope.password==undefined){
                  $scope.unfilledFields="voer wachtwoord in"
                    $scope.fieldChecker="no filled";
                  }else if ($scope.password!=$scope.password2){
                    $scope.unfilledFields="Wachtwoord komt niet overeen"
                    $scope.fieldChecker="no filled";
                  }else if ($scope.userBirthDate==undefined){
                    $scope.unfilledFields="voer geboortedag in";
                     $scope.fieldChecker="no filled";
                  }else if ($scope.userGender===undefined){
                  $scope.unfilledFields="selecteer geslacht";
                    $scope.fieldChecker="no filled";
                   }else if ($scope.selectedCountryOnRegistration ===undefined){
                    $scope.unfilledFields="selecteer land"
                    $scope.fieldChecker="no filled";

                  }else if ($scope.notStatedHere==true){
                      if($scope.city===undefined){
                        $scope.unfilledFields="Schrijf een stadsnaam, stad waar je woont"
                        $scope.fieldChecker="not filled";
                      }
                  }else if ($scope.notStatedHere==false || $scope.notStatedHere==undefined){
                     if ($scope.selectedCityOnRegistration==undefined){
                       $scope.unfilledFields="Voer een plaatsnaam in, stad waar je woont"
                       $scope.fieldChecker="not filled";
                     }
                  }else{
                    $scope.fieldChecker="allFieldsAreFilled";
                  }
                }else{
                   $scope.fieldChecker="";
                  if ($scope.name==undefined){
                  $scope.unfilledFields="Enter name";
                    $scope.fieldChecker="no filled";
                  }else if ($scope.username===undefined){
                    $scope.unfilledFields="Enter user name"
                    $scope.fieldChecker="no filled";
                  }else if ($scope.email==undefined){
                      $scope.unfilledFields="Enter email"
                      $scope.fieldChecker="no filled";
                  }else if ($scope.password==undefined){
                    $scope.unfilledFields="enter password"
                    $scope.fieldChecker="no filled";
                  }else if ($scope.password!=$scope.password2){
                  $scope.unfilledFields="Password mismatch"
                    $scope.fieldChecker="no filled";
                  }else if ($scope.userBirthDate==undefined){
                     $scope.unfilledFields="enter birth day";
                     $scope.fieldChecker="no filled";
                  }else if ($scope.userGender===undefined){
                  $scope.unfilledFields="select gender";
                    $scope.fieldChecker="no filled";
                  }else if ($scope.selectedCountryOnRegistration ===undefined){
                    $scope.unfilledFields="select a country"
                    $scope.fieldChecker="no filled";

                  }else if ($scope.notStatedHere==true){
                      if($scope.city===undefined){
                        $scope.unfilledFields="Write a city name,city where you live in"
                        $scope.fieldChecker="not filled";
                      }
                  }else if ($scope.notStatedHere==false || $scope.notStatedHere==undefined){
                     if ($scope.selectedCityOnRegistration==undefined){
                      $scope.unfilledFields="Enter a city name,city where you live in"
                       $scope.fieldChecker="not filled";
                     }
                  }else{
                    $scope.fieldChecker="allFieldsAreFilled";
                  }
                }
            }
             //register the user
            $scope.register=function(){
                    registrationFieldsChecker();
                    var todayDate =$scope.userBirthDate;
                    var birthDateYear = todayDate.getFullYear();
                    var todayMonth = todayDate.getMonth();
                    var todayDay = todayDate.getDate();
                    var today=new Date()
                    var todayYear=today.getFullYear();
                    var myage = todayYear-birthDateYear;
                    if(myage<15){
                        if($scope.languageKey=='TG'){
                           alert("ይቅረታ ዕድመኹም ትሕቲ 15 ዓመት ስለዘሎ ንክትምዝገቡ ኣይፍቀደኩምን ኢዩ።")
                        }else{
                          alert("Sorry! You are not allowed because your age is less than 15 years old")
                        }
                    }else{
                      var userRegistration={}
                      userRegistration.name=$scope.name;
                      userRegistration.username=$scope.username;
                      userRegistration.email=$scope.email;
                      userRegistration.password=$scope.password;
                      userRegistration.password2=$scope.password2;
                      userRegistration.languageModel=$scope.languageModel;
                      userRegistration.birthDate=$scope.userBirthDate;
                      userRegistration.gender=$scope.userGender.Id;
                      userRegistration.country=$scope.selectedCountryOnRegistration;
                    //  userRegistration.photo=$scope.photo;
                      if($scope.notStatedHere==true){
                        userRegistration.livesIn=$scope.city;
                      }else{
                        userRegistration.livesIn=$scope.selectedCityOnRegistration;
                      }
                            if($scope.fieldChecker===''){
                              $http.post('/jobFinder/register',userRegistration).then(function(response){
                                   $scope.userId=response.data
                                   $scope.signUpAlert=true;
                                   $scope.LoginBox = !$scope.LoginBox;
                                   $scope.RegisterBox = !$scope.RegisterBox;
                               })
                            }
                    }
            }
            $scope.citySelectionAtRegistration=function(){
              $scope.selectedCityOnRegistration=$scope.cityDatas;
            }
            $scope.countrySelectionAtRegistration=function(){
              $scope.selectedCountryOnRegistration=$scope.countryDatas
            }
            var languageId;
            $scope.english=function(){
             languageId=1;
             $scope.languageKey='EN'
            }
             $scope.dutch=function(){
              languageId=2;
              $scope.languageKey='NL'
            }
             $scope.tigrigna=function(){
              languageId=3;
              $scope.languageKey='TG'
            }
            function checkusername(userName){
               $http.post('/jobFinder/checkUserName/'+userName).then(function(response){
                if(response.data.length>0){
                  alert("user already existed")
                   $scope.username="";
                }else{
                  document.getElementById("username").innerHTML="";
                }
               })
            }
            $scope.checkUserName=function(){
                  checkusername($scope.username)
            }
    })
//user registration
   myApp.controller('userRegistrationController',function($scope,$http,$window,srvShareData,alertService,countryRetriever,cityRetriever){
             $scope.sharedData = srvShareData.getData();
             $scope.Authenticate=$scope.sharedDataUserName[5]
              $scope.photo=$scope.sharedDataUserName[2]
              $scope.toggle_userSetting = function() {
                  $scope.userSetting=!$scope.userSetting;
              };
              $scope.toggle_profilePicSetting = function() {
                  $scope.profilePic=!$scope.profilePic;
              };
              function postAllPosts(){
                  var data={};
                  data.token=$scope.Authenticate;
                   $http.post('/jobFinder/userPostposts',data).then(function(response){
                      $scope.allPostsdata=response.data
                  })
                }
              $scope.toggle_userPosts=function(){
                  $scope.userPosts=!$scope.userPosts;
                  postAllPosts();
              }
              $scope.fillCountry = function(){
                var data=null
                  var dataPromise = countryRetriever.getCountry($scope.country);
                    $scope.datas=null;
                    dataPromise.then(function(data){
                    $scope.countryDatas = data;
                   });
               }
               $scope.countrySelection = function(suggestion){
                 $scope.selectedCountry=suggestion
               }
               $scope.fillCity = function(){
                   var data=null
                   if($scope.country==null){
                     alert("enter country first")
                   }else if($scope.selectedCountry==undefined){

                   }else{
                     var dataPromise = cityRetriever.getCity($scope.city,$scope.selectedCountry);
                       $scope.datas=null;
                       dataPromise.then(function(data){
                       $scope.cityDatas = data;
                      });
                   }
                }
                $scope.citySelection = function(suggestion){
                  $scope.selectedCity=suggestion

                }
        //load and crop user image profile and save it to database
            $scope.myImage='';
            $scope.myCroppedImage='';
            var handleFileSelect=function(evt) {
              var file=evt.currentTarget.files[0];
              var reader = new FileReader();
              reader.onload = function (evt) {
                $scope.$apply(function($scope){
                  $scope.myImage=evt.target.result;
                });
              };
              reader.readAsDataURL(file);
            };
            angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
          //upload the croped image profile
            $scope.uploadCropedImage=function(){

                  var mimeString = $scope.myCroppedImage.split(',')[0].split(':')[1].split(';')[0];
                  // post the data part and decode it
                  var dataString = window.atob($scope.myCroppedImage.split(',')[1]);
                  var dataArray = [];
                  for(var i = 0; i < dataString.length; i++)
                  {
                    dataArray.push(dataString.charCodeAt(i));
                  }
                  var imageData = new Blob([new Uint8Array(dataArray)], {type: mimeString});
                  var fd = new FormData();

                  fd.append('file', imageData);
                 var info = {
                     userId:$scope.idUser
                  };
                  fd.append('data', info.userId);

                  $http({
                    url: '/jobFinder/uploadUserProfile1',
                    method: 'POST',
                    data: fd,
                    transformRequest:angular.identity,
                    headers:{'Content-Type':undefined}
                  }).then(function(response){
                    document.getElementById("reactionAlert").innerHTML="Your profile image changed successfully";
                    postUserInfo()

                  }, function(response) {
                      $scope.error = response.statusText;
                  });
            }
       //post user info
       function postUserInfo(){
        var data={}
        data.token=$scope.Authenticate;
         $http.post('/jobFinder/userSettings',data).then(function(response){
               $scope.idUser=response.data[0].id
               $scope.name=response.data[0].name;
                $scope.username=response.data[0].username;
                $scope.email=response.data[0].email;
                $scope.userBirthDate=new Date(response.data[0].birthDate);
                $scope.userGender=response.data[0].gender;
                $scope.country=response.data[0].country;
                $scope.city=response.data[0].livesIn;
                $scope.photo=response.data[0].photo;
                $scope.userSettings={
                    userId:$scope.idUser,
                    name:$scope.name,
                    username:$scope.username,
                    email:$scope.email,
                    password:$scope.password
                }
           })

       }
         postUserInfo()
           $scope.updateRegistration=function(){
                      var data={}
                      data.token=$scope.Authenticate;
                      data.name=$scope.name;
                      data.username=$scope.username;
                      data.email=$scope.email;
                      data.password=$scope.password;
                      data.userBirthDate=$scope.userBirthDate;
                      data.country=$scope.selectedCountry;
                      data.livesIn=$scope.selectedCity;
                  $http.post('/jobFinder/updateUserInfo',data).then(function(response){
                   alertService.handleRegistrationUpdates();
                   alert("successfully updated");
                  });
           }
      })
//alertservice service
    myApp.factory('alertService', function($http,$q){
        return {
            // post : function(params){
            //     return $http.post('/jobFinder/postThingsToSale/', {
            //         params : params
            //     });
            // },
            //  postThingsToSale : function(){
            //     return $http.post('/jobFinder/postPosts/');
            // },
            getWebCollections:function(webCollectionId){
               return $http.post('/webCollection',webCollectionId)
            },
            postCommens:function(id){
                return $http.post('/jobFinder/postComment/'+id)
              },
            handelSaved:function(){
               document.getElementById("reactionAlert").innerHTML="Saved successfully";
            },
            handleUpdated:function(){
               document.getElementById("reactionAlert").innerHTML="successfully update";
            },
            handleLogin:function(){
              document.getElementById("reactionAlert").innerHTML="Wrong user name or password!If you have not yet registered please click register and then register its for free ";
            },
            handelFriendRequest:function(){
              document.getElementById("reactionAlert").innerHTML="Friend Request has been sent";
            },
            handelMessageSent:function(){
              document.getElementById("reactionAlert").innerHTML="Message has been sent";
            },
            handelWorkInvitation:function(){
              document.getElementById("reactionAlert").innerHTML="Work invitation has been sent";
            },
             handelFriendRequestTig:function(){
              document.getElementById("reactionAlert").innerHTML="ሕቶ ምሕዝነት ብግቡእ ተሰዲዱ ኣሎ።";
            },
            handelMessageSentTig:function(){
              document.getElementById("reactionAlert").innerHTML="መልእኽቲ ተሰዲዱ ኣሎ።";
            },
            handelWorkInvitatioTig:function(){
              document.getElementById("reactionAlert").innerHTML="ናይ ስራሕ ሕቶ ተሰዲዱ ኣሎ።";
            },
             handelSavedTig:function(){
              document.getElementById("reactionAlert").innerHTML="ተዓቒቡ ኣሎ";
            },
             handelUpdatedTig:function(){
              document.getElementById("reactionAlert").innerHTML="ተሓዲሱ ኣሎ";
            },
            handelClientRegistered:function(){
                    document.getElementById("reactionAlert").innerHTML="You registered as Client";
            },
            handelProfessionalRegistered:function(){
                 document.getElementById("reactionAlert").innerHTML="You registered as Professional";
            },
            handelNeitherClientNorProfessionalRegistered:function(){
              document.getElementById("reactionAlert").innerHTML="you are not yet registered as Client or Professional";
            },
            handleRegistrationUpdates:function(){
               document.getElementById("reactionAlert").innerHTML="Updated Successfully";
            },
            handelRepliedMessage:function(){
               document.getElementById("reactionAlert").innerHTML="Replied sent";
            },
            handelDelete:function(){
              document.getElementById("reactionAlert").innerHTML="deleted successfully";
            },
            handelAllCities:function(data){
               return $http.post('/jobFinder/cities',data)
            },
             checkIfUserIsClientOrProfessional:function(data){
                return $http.post('/jobFinder/checkIfUserIsClientOrProfessional',data)
             },
             loadAllClients:function(data){
               return $http.post('/jobFinder/postAllclients',data)
             },
             loadClientsAccordingUserCriteria:function(data){
                return $http.post('/jobFinder/postAllclientsAccordingUserCriteria',data)
             },
             loadAllProfessionals:function(data){
              return $http.post('/jobFinder/listOfprofessionals',data)
             },
             loadProfessionalsAccordingUserCriteria:function(data){
                 return $http.post('/jobFinder/listOfprofessionalsAccordingUserCriteria',data)
             },
             getUserInfo:function(data){
              return $http.post('/jobFinder/userInfo',data);
             },
             getCurrentUserId:function(data){
                 return  $http.post('/jobFinder/getCurrentUserId',data)
             },
             getNotifications:function(data){
              return $http.post('/jobFinder/postTheUserNotifications',data)
             },
             getMoreNotificationOnScroll:function(data){
              return $http.post('/jobFinder/postTheUserNotificationsOnScrolling',data)
             },
             getMessagesNotification:function(data){
              return $http.post('/jobFinder/postNotificationMessages',data)
             },
             getMessageOnScrolling:function(data){
              return $http.post('/jobFinder/postMessagesOnScrolling',data)
             }
        }
    });
      myApp.run(function(amMoment) {
        amMoment.changeLocale('en');
      });
//top bar
  myApp.controller('homePageController', function($scope,$http,srvShareData,candidateUser,$window,$location,alertService,socket,$translate) {
          //post public assets
            $scope.sharedData = srvShareData.getData();
            $scope.sharedDataUserName=$scope.sharedData[0];
            $scope.userFullName=$scope.sharedDataUserName[1];
            $scope.photo=$scope.sharedDataUserName[2]
            $scope.Authenticate=$scope.sharedDataUserName[5]
            $scope.permission=$scope.sharedDataUserName[6]
            $scope.languageKey=$scope.sharedDataUserName[7]
            $scope.country=$scope.sharedDataUserName[8];
            $scope.livesIn=$scope.sharedDataUserName[9];
            var data={}
            data.token=$scope.Authenticate;
            function myLanguage(){
              $translate.use($scope.languageKey);
            }
            myLanguage();
         //load post to the modal
            $scope.showModal=function(id){
               postPosts(id);
               postComment(id);
               $scope.homePage=!$scope.homePage;
               $scope.commentShow=!$scope.commentShow;
            }
            //get user id for extracting information of the user who wrote a notification.
            function clearPropertyData(){
                      $scope.name=undefined
                      $scope.gender=undefined
                      $scope.profession=undefined
                      $scope.livesInNotification=undefined
                      $scope.email=undefined
                      $scope.workSession=undefined
                      $scope.remarks=undefined
                       $scope.name=undefined
                      $scope.gender=undefined
                      $scope.lookingFor=undefined
                      $scope.timeTaken=undefined
                      $scope.workDetails=undefined
                        $scope.telephone=undefined
                      $scope.date=undefined
                      $scope.fromPlace=undefined
                      $scope.toPlace=undefined
                      $scope.transportChoosed=undefined
            }
            $scope.showHomePage=function(){
              $scope.homePage=!$scope.homePage;
              $scope.commentShow=!$scope.commentShow;
            }
            $scope.getUserId=function(id){
              candidateUser.addData(id)
              $scope.candidateUser1=candidateUser.getData();
                  clearPropertyData();
                  var userInfo={}
                  userInfo.id=id
                  userInfo.languageKey=$scope.languageKey;
               $http.post('/checkWhoIsThisUser',userInfo).then(function(response){
                 $scope.userIsFrom=response.data
                      if($scope.userIsFrom.profession.length>0){
                             $scope.name=$scope.userIsFrom.profession[0].name;
                             $scope.gender=$scope.userIsFrom.profession[0].genderInEnglish;
                             $scope.profession=$scope.userIsFrom.profession[0].profession;
                             $scope.livesInNotification=$scope.userIsFrom.profession[0].livesIn;
                             $scope.country=$scope.userIsFrom.profession[0].country;
                             $scope.email=$scope.userIsFrom.profession[0].email;
                             $scope.workSession=$scope.userIsFrom.profession[0].workSession
                             $scope.remarks=$scope.userIsFrom.profession[0].remarks;
                        }else if($scope.userIsFrom.client.length>0){
                             $scope.name=$scope.userIsFrom.client[0].name;
                             $scope.gender=$scope.userIsFrom.client[0].englishGender;
                             $scope.lookingFor=$scope.userIsFrom.client[0].lookingFor;
                             $scope.livesInNotification=$scope.userIsFrom.client[0].livesIn
                              $scope.country=$scope.userIsFrom.client[0].country;
                              $scope.email=$scope.userIsFrom.client[0].email;
                             $scope.timeTaken=$scope.userIsFrom.client[0].timeTaken;
                             $scope.workDetails=$scope.userIsFrom.client[0].workDetails
                              $scope.remarks=$scope.userIsFrom.client[0].remarks;
                        }else if($scope.userIsFrom.passenger.length>0){
                           $scope.telephone=$scope.userIsFrom.passenger[0].telephone;
                           $scope.date=$scope.userIsFrom.passenger[0].date;
                           $scope.fromPlace=$scope.userIsFrom.passenger[0].fromPlace;
                           $scope.toPlace=$scope.userIsFrom.passenger[0].toPlace;
                           $scope.transportChoosed=$scope.userIsFrom.passenger[0].transportChoosed;
                           $scope.countryNotification=$scope.userIsFrom.passenger[0].country;
                           $scope.livesInNotification=$scope.userIsFrom.passenger[0].livesIn;
                       }else{
                           $scope.name=$scope.userIsFrom.users[0].name;
                           $scope.email=$scope.userIsFrom.users[0].email;
                           $scope.country=$scope.userIsFrom.users[0].country;
                           $scope.livesInNotification=$scope.userIsFrom.users[0].livesIn;
                       }
               })
            }
        //post posts by id
              function postPosts(id){
                  data.id=id
                  $http.post('/jobFinder/postPostModal',data).then(function(response){
                    $scope.description=response.data[0].postDescription;
                    $scope.fileName=response.data[0].fileName;
                    $scope.id=response.data[0].id;
                    $scope.fileType=response.data[0].fileType;
                    $scope.room=response.data[0].room;
                    $scope.posterUserId=response.data[0].userId;
                    $scope.numberOfLikes=response.data[0].numberOfLikes;
                    $scope.numberOfShares=response.data[0].numberOfShares;
                  })
              }
          //post comments by id
              $scope.postComments=function(id){
                postComment(id);
              }
             function postComment(id)
             {
                data.id=id
                $http.post('/jobFinder/postComment',data).then(function(response){
                 $scope.comments=response.data
                })
             }
              function checkIfUserIsClientOrProfessional(){
                  $http.post('/jobFinder/checkIfUserIsClientOrProfessional',data).then(function(response){
                    $scope.userIdentity=response.data;
                   if($scope.userIdentity=='client'){
                           $scope.disabledClient=true;
                   }else if($scope.userIdentity=='professional'){
                          $scope.disabledProfessional=true;
                   }else{
                     $scope.disabledProfessional=true;
                     $scope.disabledClient=true;
                   }
                  })
                }
                checkIfUserIsClientOrProfessional()
                $scope.notificationHasBeenSeen=function(){
                 $scope.notificationResultOne=0;
                }
                $scope.messageHasBeenSeen=function(){
                  $scope.numberOfMessages=0;
                }
                $scope.friendRequestHasBeenSeen=function(){
                  $scope.numberOfFriendRequests=0;
                }
          //socket io............................................................................................
                //create private room
                  $scope.createRoom = function () {
                         var data2={};
                         data2.token=$scope.Authenticate;
                        alertService.getCurrentUserId(data2).then(function(response){
                           $scope.idUser=response.data
                           socket.emit('userSession',$scope.idUser);
                            var data={}
                                  data.username=$scope.userFullName
                                  $scope.curtrentUser = data.username;
                                  data.userId=$scope.idUser;
                                  data.photo=$scope.photo;
                                  data.roomName=$scope.roomName;
                                  data.roomDescription=$scope.roomDescription;
                                  socket.emit('createprivateroom', data);
                                 socket.on('roomNumber',function(roomNumber){
                                 $scope.currentUserRoomNumber=roomNumber
                                 //join the user to his own room
                                 var data1={}
                                    data1.room=$scope.currentUserRoomNumber;
                                    data1.username=$scope.userFullName;
                                    data1.userId=$scope.idUser
                                    $scope.curtrentUser = data1.username;
                                    socket.emit('addprivateuser', data1);
                                 })
                            });
                            socket.on('onlineUsers',function(data){
                             $scope.onlineUsers.length=0;
                            data.forEach(function(element){
                              $scope.onlineUsers.push(element)
                            })
                          })
                      }
                      $scope.createRoom()
                      $scope.saleItemMessages=[];
                      $scope.clientHandShakes=[];
                      $scope.saleItemNotice=[];
                 socket.on('sendHandShakingMessageFromClientToSupplier',function(data){
                   var clientInfo={}
                   clientInfo.message=data.message;
                   clientInfo.date=Date.now();
                   clientInfo.saleItemId=data.saleItemId
                   clientInfo.socketId=data.socketId;
                   clientInfo.languageKey=data.languageKey;
                   $scope.saleItemMessages.push(clientInfo);
                   $scope.saleItemNotice.push(clientInfo)
                   $scope.toName="client is willing to talk about the item "+data.saleItemId
                   $scope.saleItemId=data.saleItemId;
                   $scope.clientRoom=data.clientRoom;
                   $scope.supplierRoom=data.supplierRoom;
                   $scope.numberOfMessagesInSaleClients=+1
                 })
                 $scope.chatWithThisSaleClient=function(socketId,languageKey){
                   $scope.saleItemchatbox=false;
                   $scope.socketId=socketId;
                   $scope.numberOfMessagesInSaleClients-=1;

                   $scope.saleItemMessages.length=0;
                   var clientInfo={}
                   if (languageKey==undefined) {
                       var startChatWithClient={}
                       startChatWithClient.clientSocket=socketId;
                       startChatWithClient.message="hello what can i help you"
                       socket.emit("helloClient",startChatWithClient)
                     clientInfo.message="client use english language"
                      $scope.saleItemMessages.push(clientInfo);
                      $scope.saleItemchatbox=true;
                   }else if (languageKey=='TG') {
                     var startChatWithClient={}
                     startChatWithClient.clientSocket=socketId;
                     startChatWithClient.message="ሰላም፥ እንታይ ክንሕግዝ?"
                     socket.emit("helloClient",startChatWithClient)
                     clientInfo.message="client use TIGRINA LANGUAGE"
                     $scope.saleItemMessages.push(clientInfo);
                     $scope.saleItemchatbox=true;
                   }else if(languageKey=='NL'){
                     var startChatWithClient={}
                     startChatWithClient.clientSocket=socketId;
                     startChatWithClient.message="wat kan ik jouw helpen?"
                     socket.emit("helloClient",startChatWithClient)
                     clientInfo.message="client use DUTCH LANGUAGE"
                      $scope.saleItemMessages.push(clientInfo);
                      $scope.saleItemchatbox=true;
                   }else {
                     var startChatWithClient={}
                     startChatWithClient.clientSocket=socketId;
                     startChatWithClient.message="hello what can i help you"
                     socket.emit("helloClient",startChatWithClient)
                     clientInfo.message="client use english language"
                      $scope.saleItemMessages.push(clientInfo)
                      $scope.saleItemchatbox=true;
                   }

                 }
                      $scope.closeChatWithSupplier=function(){
                        $scope.saleItemchatbox=false;
                        $scope.saleItemId="";
                        $scope.clientRoom="";
                        $scope.supplierRoom=""
                      }
                      $scope.getSaleItem=function(){
                        var saleItemIdInfo={}
                        saleItemIdInfo.saleItemId=$scope.saleItemId
                        $http.post('/getSaleItemById',saleItemIdInfo).then(function(response){
                          $scope.catagories=response.data[0].catagories;
                          $scope.price=response.data[0].price;
                          $scope.unit=response.data[0].unit;
                          $scope.saleItemfileName=response.data[0].fileName;
                          $scope.saleItemName=response.data[0].itemName
                        })
                      }
                      $scope.getDetailsOfItemForSale=function(){
                        var detailsOfItem={}
                        detailsOfItem.saleItemId=$scope.saleItemId;
                        $http.post('/getDetailsInfoOfItemForSale',detailsOfItem).then(function(response){
                          $scope.saleItemDetails=response.data
                        })
                      }
                      socket.on('sendHandShakingMessageFromSupplierToClient',function(data){
                        var messages={}
                        messages.message=data.message;
                        messages.date=Date.now();
                        messages.username=data.username;
                        messages.socketId=data.socketId;
                        $scope.supplierSocketId=data.supplierSocketId;
                        $scope.clientSocketId=data.clientSocketId;
                        $scope.supplierMessage.push(messages);
                      })
                      $scope.sendMessageBetweenClientAndSupplier=function(message){
                        var sendMessageBclientAndSup={}
                        sendMessageBclientAndSup.clientRoom=$scope.clientRoom;
                        sendMessageBclientAndSup.supplierRoom=$scope.supplierRoom;
                        sendMessageBclientAndSup.message=message;
                        sendMessageBclientAndSup.username="Supplier"
                        sendMessageBclientAndSup.clientSocketId=$scope.clientSocketId;
                        sendMessageBclientAndSup.supplierSocketId=$scope.supplierSocketId;
                        socket.emit('startConversationBtwClientAndSupplier',sendMessageBclientAndSup)
                        $scope.message="";
                      }
                      socket.on('messageFromClientOrSupplier',function(data){
                        var messages={}
                        messages.message=data.message;
                        messages.date=Date.now();
                        messages.username=data.username;
                        $scope.saleItemMessages.push(messages);
                      })
                //open chat box
                     $scope.letsChat=function(toUserId,toName){
                        $scope.toUserId=toUserId;
                         data.toUserId=toUserId
                        //get a user room number
                            $http.post('/jobFinder/postRoom',data).then(function(response){
                              $scope.roomNumber=response.data[0].userroom
                            })
                            $http.post('/jobFinder/getMessagesThatHadWithMe',data).then(function(response){

                              var messageData=response.data
                              $scope.postUserMessagesFromChat=messageData.reverse()
                            })
                           $scope.toName=toName
                           $scope.chatbox=true;
                      }
                // messages from users
                     $scope.postUserMessagesFromChat = [];
                     $scope.friendRequests=[];
                      socket.on('connect', function () { });
                        socket.on('updateprivatechat', function (fromUserFullName, data,userId,photo,toUserId) {
                          var user = {};
                          user.photo=photo
                          user.username = fromUserFullName;
                          user.toUserId=toUserId
                          user.message = data;
                          user.date = new Date();
                         if(user.message=="has a job for you" || user.message=="has applied for your job" || user.message=="liked your post" || user.message=="accepted your request" || user.message=="did not accept your request" || user.message=="commented on your post" || user.message=="shared your post"){
                             if(user.username===$scope.userFullName){
                             }else{
                               postNumberOfNotification();
                               postNotification();
                               $scope.numberOfNotifications+=1
                             }
                         }else if(user.message=="Friend Request"){
                               $scope.numberOfFriendRequests+=1
                              getFriendRequests();
                         }else{
                             $scope.numberOfMessages+=1
                             postMessages();
                             $scope.postUserMessagesFromChat.push(user);
                         }
                      });
                //online users
                    $scope.onlineUsers=[];
                //send message to user
                    $scope.sendMessage = function (message) {
                        if(message==''){

                        }else{
                            var roomNumber=$scope.roomNumber;
                            var toUserId=$scope.toUserId
                              data.message=message
                              data.photo=$scope.photo
                              data.toUserId=toUserId;
                              data.fromUserFullName=$scope.userFullName;
                              data.room=$scope.roomNumber
                              data.fromUserId=$scope.idUser;
                              data.userIs=$scope.userIs;
                              socket.emit('sendprivatechat', data);
                              $scope.message='';
                        }
                    }
                 $scope.onEnter=function(message){
                     if(message==''){

                     }else{
                        var roomNumber=$scope.roomNumber;
                      var toUserId=$scope.toUserId
                       // var data={}
                        data.message=message
                        data.photo=$scope.photo
                        data.toUserId=toUserId;
                        data.fromUserFullName=$scope.userFullName;
                        data.room=$scope.roomNumber
                        data.fromUserId=$scope.idUser;
                        data.userIs=$scope.userIs;
                        socket.emit('sendprivatechat', data);
                        $scope.message='';
                     }

                  }
                //close chat
                     $scope.closeChat=function(name){
                       $scope.chatbox=false;
                     }

                //logout
                      $scope.logout=function(data){
                          var data={}
                          data.userId=$scope.idUser;
                          data.username=$scope.userFullName;
                          data.room=$scope.roomNumber;
                          socket.emit('disconnectPrivateUser', data);
                      }

              function getNumberOfFriendRequests(){
                $http.post('/jobFinder/numberOfFriendRequest',data).then(function(response){
                  $scope.numberOfFriendRequests=response.data[0].numberOfFriendRequests;
                })
              }
              getNumberOfFriendRequests()
              function getFriendRequests(){
                $http.post('/jobFinder/friendRequests',data).then(function(response){
                     $scope.friendRequests=response.data
                     if(response.data.length==7){
                      $scope.lastFriendRequestId=response.data[6].Id
                     }

                })
              }
              getFriendRequests()
              $scope.getFriendRequestsOnScrolling=function(){
                data.lastFriendRequestId=$scope.lastFriendRequestId
                $http.post('/jobFinder/friendRequestsOnScrolling',data).then(function(response){
                     $scope.friendRequests.push(response.data[0],response.data[1],response.data[2],response.data[3],response.data[4])
                      if(response.data.length==5){
                        $scope.lastFriendRequestId=response.data[4].Id
                      }

                })
              }
            $scope.okFriendRequest=function(id,toUserId,room){
                data.id=id
                data.toUserId=toUserId;
                data.room=room;
                $http.post('/jobFinder/okFriendRequest',data).then(function(response){
                })
            }
            $scope.noFriendRequest=function(id,toUserId,room){
                var data={}
                data.token=$scope.Authenticate;
                data.id=id;
                data.toUserId=toUserId;
                data.room=room;
                $http.post('/jobFinder/noFriendRequest',data).then(function(response){
                  alertService.handelSuccess();
                });
            }
            //  postOnlineUsers();
          function postAllListsOfProfessionals(){
                  data.country=$scope.country;
                  data.livesIn=$scope.livesIn;
                  data.languageKey=$scope.languageKey;
               alertService.loadProfessionalsAccordingUserCriteria(data).then(function(response){
                   $scope.listOfAllWorkers=response.data
               })
          }
          postAllListsOfProfessionals()
            function postAllListsOfClients(){
                  data.country=$scope.country;
                  data.livesIn=$scope.livesIn;
                  data.languageKey=$scope.languageKey
                  alertService.loadClientsAccordingUserCriteria(data).then(function(response){
                     $scope.listOfAllClients=response.data
                  })
            }
             postAllListsOfClients();
          //post all posts
          function postAllPosts(){
             $http.post('/jobFinder/postPosts',data).then(function(response){
                $scope.allPostsdata=response.data
                if(response.data.length==5){
                  $scope.lastId=response.data[4].id
                }else{

                }
            })
          }
          $scope.deletePost=function(id,fileName,remarks,idAtShareTable){
            data.postId=id;
            data.fileName=fileName;
            data.remarks=remarks;
            data.idAtShareTable=idAtShareTable;
           if(remarks==null){
              $http.post('/jobFinder/deletePost',data).then(function(response){
             $scope.deletedPost=response.data
             postAllPosts();
            })
           }else{
             $http.post('/jobFinder/deleteSharedPost',data).then(function(response){
               $scope.deletedPost=response.data
               postAllPosts();
              })
           }
          }
          postAllPosts();
       //post number of messages
          function postNumberOfMessage(){
                $http.post('/jobFinder/postNumberOfMessages',data).then(function(response){
                  if(response.data.length==0){
                  }else{
                     $scope.numberOfMessages=response.data[0].numberOfMessages
                  }
                })
          }
      //post the messages
        function postMessages(){
           alertService.getMessagesNotification(data).then(function(response){
                       $scope.postUserMessages=response.data
                       if(response.data.length==5){
                        $scope.lastMessageId=response.data[4].Id
                       }
            })
        }
        $scope.getMessageOnScrolling=function(){
              data.lastMessageId=$scope.lastMessageId
           alertService.getMessageOnScrolling(data).then(function(response){
                       $scope.postUserMessages.push(response.data[0],response.data[1],response.data[2])
                       $scope.lastMessageId=response.data[2].Id
            })
        }
    //number of notification from the client
        function postNumberOfNotification(){
              $http.post('/jobFinder/userNotifications',data).then(function(response){
                 if(response.data.length==0){
                 }else{
                  $scope.notificationResultOne=response.data[0].numberOfNotifications
                 }
              })
        }
    //post notification intended to the contact
          function postNotification(){
             alertService.getNotifications(data).then(function(response){
                   $scope.userNotificationMessages=response.data
                   if(response.data.length==5){
                    $scope.lastNotificationId=response.data[4].Id
                   }
              })
          }
          $scope.getOtherNotificationsOnScrolling=function(){
            data.lastNotificationId=$scope.lastNotificationId;
             alertService.getMoreNotificationOnScroll(data).then(function(response){
                   $scope.userNotificationMessages.push(response.data[0],response.data[1],response.data[2])
                    $scope.lastNotificationId=response.data[2].Id
              })
          }
         postNumberOfMessage()
         postMessages()
         postNumberOfNotification()
         postNotification();
      //get data on scroll to bottom
        angular.element($window).bind("scroll",function() {
          var windowHeight = "innerHeight" in window ? window.innerHeight
              : document.documentElement.offsetHeight;
          var body = document.body, html = document.documentElement;
          var docHeight = Math.max(body.scrollHeight,
              body.offsetHeight, html.clientHeight,
              html.scrollHeight, html.offsetHeight);
          windowBottom = windowHeight + window.pageYOffset;
          if (windowBottom >= docHeight) {
             data.lastId=$scope.lastId;
             $http.post('/jobFinder/getPost',data).then(function(response){
                  $scope.allPostsdata.push(response.data[0])
                 if(response.data.length==4){
                     $scope.lastId=response.data[4].id
                 }
             })
          }
      });
    //post the like information
      $scope.like=function(postId,room,toUserId){
            var commentTextBox=$scope.userFullName+" liked your post"
            data.postId=postId,
            data.comments=commentTextBox,
            data.userIs=$scope.userIs;
            $http.post('/jobFinder/likeInfo',data).then(function(response){
             postAllPosts()
            })
            var data2={}
            data2.message="liked your post";
            data2.photo=$scope.photo
            data2.username=$scope.userFullName;
            data2.toUserId=toUserId;
            data2.room=room;
            data2.fromUserId=$scope.idUser
            data2.userIs=$scope.userIs;
            data2.postId=postId;
            socket.emit('sendprivatechat', data2);
        }
    //post the comment information
      $scope.comment=function(postId,commentMessageTextBox,room,posterUserId){
            if(commentMessageTextBox===undefined || commentMessageTextBox===''){
            }else{
              var data2={}
              data2.token=$scope.Authenticate;
              data2.postId=postId;
              data2.comments=commentMessageTextBox;
              data2.userIs=$scope.userIs
              $http.post('/jobFinder/commentInfo',data2).then(function(response){
              })
            var roomNumber=room;
            var data3={}
            data3.message="commented on your post";
            data3.photo=$scope.photo;
            data3.username=$scope.userFullName;
            data3.toUserId=posterUserId;
            data3.room=room;
            data3.fromUserId=$scope.idUser;
            data3.userIs=$scope.userIs;
            data3.comments=commentMessageTextBox;
            data3.postId=postId
            socket.emit('sendprivatechat', data3);
            socket.on('updateprivatechat',function(data){
               postComment(postId);
               $scope.commentMessageTextBox='';
            })

        }
      }
      $scope.onEnter=function(postId,commentMessageTextBox,room,posterUserId){
            if(commentMessageTextBox==''){

            }else{
              var data2={}
              data2.token=$scope.Authenticate;
              data2.postId=postId;
              data2.comments=commentMessageTextBox;
              data2.userIs=$scope.userIs
              $http.post('/jobFinder/commentInfo',data2).then(function(response){
              })
            var roomNumber=room;
            var data3={}
            data3.message="commented on your post";
            data3.photo=$scope.photo;
            data3.username=$scope.userFullName;
            data3.toUserId=posterUserId;
            data3.room=room;
            data3.fromUserId=$scope.idUser;
            data3.userIs=$scope.userIs;
            data3.comments=commentMessageTextBox;
            data3.postId=postId
            socket.emit('sendprivatechat', data3);
            socket.on('updateprivatechat',function(data){
               postComment(postId);
            })
            $scope.commentMessageTextBox='';
        }
      }
      $scope.sharePostData=function(postId,posterUserId,room,postDescription,fileType,fileName,posterName){
        $scope.postId=postId;
        $scope.posterUserId=posterUserId;
        $scope.room=room;
        $scope.postDescription=postDescription;
        $scope.fileType=fileType;
        $scope.fileName=fileName;
        $scope.posterName=posterName
      }
      $scope.sharePost=function(postId,posterUserId,room,description,fileType,fileName,posterName,shareDescription2){
              data.postId=postId;
              data.postOwnerUserId=posterUserId;
              data.description=description;
              data.fileType=fileType;
              data.fileName=fileName;
              data.firstPosterName=posterName
              data.sharedescription=shareDescription2
               $http.post('/jobFinder/sharePostInPosts',data).then(function(response){
              })
              $http.post('/jobFinder/sharePost',data).then(function(response){
              })
               var roomNumber=room;
                  var data2={}
                  data2.message="shared your post";
                  data2.photo=$scope.photo
                  data2.username=$scope.userFullName;
                  data2.toUserId=posterUserId;
                  data2.room=room;
                  data2.fromUserId=$scope.idUser;
                  data2.postId=postId
                  socket.emit('sendprivatechat', data2);
                  socket.on('updateprivatechat',function(data){
                       postAllPosts()
                  })

      }
      function checkIfUserIsClientOrProfessional(){
        alertService.checkIfUserIsClientOrProfessional(data).then(function(response){
          $scope.userIdentity=response.data;
          $scope.userIs=$scope.userIdentity.userIs;
        })
      }
      checkIfUserIsClientOrProfessional();

  });
//things to sale controller
    myApp.controller('thingsToSaleController',function($scope,$http,srvShareData,alertService,socket,$window,$translate,countryRetriever,loginDirectoryLeader){

        $scope.onClickLoginFromSaleHomePage=function(){
          var directory="/jobFinder/thingsToSale/"
          loginDirectoryLeader.addData(directory)
        }
       //post public assets
           $scope.sharedData = srvShareData.getData();

            if($scope.sharedData.length==0){

            }else {
              $scope.sharedDataUserName=$scope.sharedData[0];
              $scope.userFullName=$scope.sharedDataUserName[1];
              $scope.permission=$scope.sharedDataUserName[6]
              $scope.photo=$scope.sharedDataUserName[2]
              $scope.Authenticate=$scope.sharedDataUserName[5]

            }
            function checkIfUserIsClientOrProfessional(){
                alertService.checkIfUserIsClientOrProfessional(data).then(function(response){
                  $scope.userIdentity=response.data;
                })
               }
            $scope.changeLanguage = function (langKey) {
               $scope.languageKey=langKey;
               $translate.use(langKey);
             };
            var data={}
              data.token=$scope.Authenticate;
                    $scope.boughtThings=[]
                    $scope.numberOfBougtItems;
                    $scope.itemsBoughtByTheCustomer={}
            $scope.fillCountry = function(){
              var data=null
                var dataPromise = countryRetriever.getCountry($scope.customerCountry);
                  $scope.datas=null;
                  dataPromise.then(function(data){
                  $scope.countryDatas = data;
                 });
             }
             $scope.countrySelection = function(suggestion){
               $scope.selectedCountry=suggestion
             }

          $scope.supplierMessage=[]
           $scope.letsChat=function(toUserId,saleItemId){
             $scope.toUserId=toUserId
             $scope.saleItemId=saleItemId
                 $scope.chatbox=true;
                 $scope.toName="Supplier"
                 var clientInfo={}
                 clientInfo.toUserId=toUserId;
                 clientInfo.saleItemId=saleItemId
                 clientInfo.languageKey=$scope.languageKey;
                 socket.emit('chatWithSupplier',clientInfo);
                 socket.on('errorOnConnection',function(data){
                   var supplierInfo={};
                   supplierInfo.status=data.online;
                   supplierInfo.message=data.message;
                   supplierInfo.server=data.server;
                   $scope.supplierMessage.push(supplierInfo)
                 })
                 socket.on('userIsNotOnline',function(data){
                   var supplierInfo={};
                   supplierInfo.status=data.online;
                   supplierInfo.message=data.message;
                   supplierInfo.server=data.server;
                   $scope.supplierMessage.push(supplierInfo)
                 })
                 socket.on('userIsOnlineNow',function(data){
                   var supplierInfo={};
                   supplierInfo.status=data.online;
                   supplierInfo.message=data.message;
                   supplierInfo.server=data.server;
                   $scope.supplierMessage.push(supplierInfo)
                   var clientInfo={}
                   clientInfo.saleItemId=saleItemId;
                   clientInfo.supplierRoom=data.supplierRoom;
                   clientInfo.languageKey=$scope.languageKey;
                   socket.emit('handShakingMessageFromClientToSupplier',clientInfo);
                 })
            }
            socket.on('sendHandShakingMessageFromSupplierToClient',function(data){
              var messages={}
              messages.message=data.message;
              messages.date=Date.now();
              messages.username=data.username;
              messages.socketId=data.socketId;
              $scope.supplierSocketId=data.supplierSocketId;
              $scope.clientSocketId=data.clientSocketId;
              $scope.supplierMessage.push(messages);
            })
            socket.on('messageFromClientOrSupplier',function(data){
              var messages={}
              messages.message=data.message;
              messages.date=Date.now();
              messages.username=data.username;
              messages.socketId=data.socketId;
              messages.supplierSocketId=$scope.supplierSocketId;
              messages.clientSocketId=$scope.clientSocketId
              $scope.supplierMessage.push(messages);
            })
            $scope.sendMessageBetweenClientAndSupplier=function(message){
              var sendMessageBclientAndSup={}
              sendMessageBclientAndSup.clientRoom=$scope.clientRoom;
              sendMessageBclientAndSup.supplierRoom=$scope.supplierRoom;
              sendMessageBclientAndSup.message=message;
              sendMessageBclientAndSup.username="client";
              sendMessageBclientAndSup.clientSocketId=$scope.clientSocketId;
              sendMessageBclientAndSup.supplierSocketId=$scope.supplierSocketId;
              socket.emit('startConversationBtwClientAndSupplier',sendMessageBclientAndSup)
              $scope.message="";
            }
            $scope.closeChat=function(name){
                 $scope.chatbox=false;
                 $scope.toUserId=""
                 $scope.saleItemId=""
                 $scope.supplierMessage.length=0
            }
            //send message to user
                $scope.send = function (message) {
                    if(message==''){

                    }else{
                          var data={}
                          data.message=message
                          data.toUserId=$scope.toUserId;
                          data.itemId=$scope.saleItemId
                          $scope.message='';
                    }
                }
                 $scope.onEnter=function(message){
                           if(message==''){
                           }else{
                                var data={}
                                data.message=message
                                data.toUserId=$scope.toUserId;
                                data.itemId=$scope.saleItemId
                                socket.emit('chatWithSupplier', data);
                                $scope.message='';
                           }

                  }

                  $scope.getDetailsOfItemForSale=function(id){
                    var detailsOfItem={}
                    detailsOfItem.saleItemId=id;
                    $http.post('/getDetailsInfoOfItemForSale',detailsOfItem).then(function(response){
                      $scope.saleItemDetails=response.data
                    })
                  }
           $scope.onselectedSize=function(id){
             $scope.itemSelectedSize=id
           }
           $scope.nextToAddressInfo=function(){
             $scope.addressInfo=!$scope.addressInfo;
              for(var key in $scope.boughtThings){
                var itemId=$scope.boughtThings[key].id
                var numberOfThisItem=$scope.boughtThings[key].numberOfItems
                $scope.itemsBoughtByTheCustomer.ItemId=itemId;
                $scope.itemsBoughtByTheCustomer.number=numberOfThisItem;
              }
           }
           $scope.nextToPayment=function(){
            $scope.nextToCustomerPayment=!$scope.nextToCustomerPayment
           }
           $scope.getBoughtItems=function(){
            $scope.boughtItems=!$scope.boughtItems;
            $scope.items=!$scope.items;
           }
           $scope.payNow=function(){
            var paymentInfo={};
            paymentInfo.userId=$scope.idUser;
            paymentInfo.username=$scope.userFullName
            $http.get('/getMolliePayments',paymentInfo).then(function(response){
              $scope.paymentdata=response.data
            })
           }
           $scope.backToSalePage=function(){
             $scope.boughtItems=!$scope.boughtItems;
             $scope.items=!$scope.items;
           }
           //if user is not logged in
           if($scope.sharedData.length==0){

           }else{
             alertService.getCurrentUserId(data).then(function(response){
               $scope.idUser=response.data
             })
            checkIfUserIsClientOrProfessional();
           }

            function postThingsToSale(){
              $http.post('/postThingsToSale').then(function(response){
               $scope.alldata=response.data;
              })
            }
            $scope.seeDetailsOfProduct=function(id){
                  var data={}
                  data.id=id
                  $http.post('/detailsOfThingsToBuy',data).then(function(response){
                        $scope.detailsOfProduct=response.data
                  })
                  function findObjectByKey(array, key, value) {
                      for (var i = 0; i < $scope.boughtThings.length; i++) {
                          if ($scope.boughtThings[i][key] === value) {
                              return $scope.boughtThings[i];
                          }
                      }
                      return null;
                  }
                  var obj = findObjectByKey($scope.boughtThings, 'id', id);
                  if($scope.boughtThings.length>0){

                     for(key in $scope.boughtThings){
                        var itemId=$scope.boughtThings[key].id;
                        if(obj){
                               $scope.cancelDisplay=true;
                               $scope.buyDisplay=false;
                        }else{
                               $scope.buyDisplay=true;
                                $scope.cancelDisplay=false;
                        }
                   }
                  }else{
                               $scope.buyDisplay=true ;
                               $scope.cancelDisplay=false;
                  }
            }
            $scope.buy=function(id,itemName,price,unit,numberOfItems,itemId){
               var defaultNumberOfItems
              if(numberOfItems==undefined){
                  defaultNumberOfItems=1;
                    $scope.total=price*defaultNumberOfItems
              }else{
                defaultNumberOfItems=numberOfItems
                $scope.total=price*defaultNumberOfItems
              }
                  var itemInfo={};
                  itemInfo.itemName=itemName;
                   itemInfo.id=id;
                  itemInfo.price=price;
                  itemInfo.unit=unit
                  itemInfo.numberOfItems=defaultNumberOfItems;
                  itemInfo.size=$scope.itemSelectedSize;
                  itemInfo.total=$scope.total
                  itemInfo.itemId=itemId;
               $scope.boughtThings.push(itemInfo)
              $scope.numberOfBougtItems=+$scope.boughtThings.length
              $scope.cancelDisplay=true;
              $scope.buyDisplay=false
            }
            $scope.getTotal = function(){
                $scope.totalItemsPrice = 0;
                for(var i = 0; i < $scope.boughtThings.length; i++){
                    var product = $scope.boughtThings[i];
                    $scope.totalItemsPrice += (product.price * product.numberOfItems);
                }

            }
            $scope.cancel=function(id){
                 index = $scope.boughtThings.findIndex(x => x.id==id);
                 $scope.boughtThings.splice(index, 1);
                  $scope.numberOfBougtItems=+$scope.boughtThings.length
                  $scope.cancelDisplay=false;
                  $scope.buyDisplay=true;

            }
            $scope.numberChanged=function(price){
              $scope.total=$scope.numberOfItems*price
            }
            $scope.delete=function(id){
              index = $scope.boughtThings.findIndex(x => x.id==id);
              $scope.boughtThings.splice(index, 1);
               $scope.numberOfBougtItems=+$scope.boughtThings.length
            }
           postThingsToSale();
           $scope.upload=function(){
              $http.post('/jobFinder/thingsToSale',data).then(function(response){
                 alertService.handelSaved();
                  postThingsToSale();
              })
            }
           $scope.deleteThingsToSale=function(id,fileName){
                data.id=id;
                data.fileName=fileName;
                  $http.post('/jobFinder/deleteThingsToSale',data).then(function(response){
                    postThingsToSale();
                    alertService.handelDelete();
                  })
            }
            $scope.newItemToSale=function(){
                $scope.itemName=undefined
                $scope.categoryId=undefined;
                $scope.price=undefined;
                $scope.unit=undefined;
                $scope.place=undefined
                $scope.telephone=undefined;
                $scope.description=undefined;
                $scope.imageUploaded=='no';
            }
               //load and crop user image profile and save it to database..............
              $scope.myImage='';
              $scope.myCroppedImage='';
              var handleFileSelect=function(evt) {
                  var file=evt.currentTarget.files[0];
                  var reader = new FileReader();
                  reader.onload = function (evt) {
                    $scope.$apply(function($scope){
                      $scope.myImage=evt.target.result;
                    });
                  };
                  reader.readAsDataURL(file);
                   console.log(file.type)
                  if(file.type=='image/jpeg' || file.type=='image/png'){
                    $scope.imageUploaderButton=false;
                    $scope.alertUploadImage="";
                    $scope.imageUploaded="yes"
                  }else{
                    $scope.imageUploaderButton=true;
                    $scope.alertUploadImage="upload image";
                    $scope.imageUploaded="no"
                  }
                };
              angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
             function errorCheckupForSaleItemInputs(noEroor){
                   if($scope.languageKey=='TG'){
                          if($scope.itemName==undefined){
                         $scope.alertUploadImage="ስም ንብረት የእትዉ።"
                         }
                        else if($scope.categoryId==undefined){
                           $scope.alertUploadImage="ምድብ ናይ ንብረት ምረጹ"
                        }
                         else if($scope.price==undefined){
                             $scope.alertUploadImage="ዋጋ ንብረት የእትዉ"
                         }
                         else if($scope.unit==undefined){
                             $scope.alertUploadImage="መዐቀኒ ዋጋ ብ ኢሮ ወይ ዶላር ምረጹ"
                         }
                         else if($scope.place==undefined){
                             $scope.alertUploadImage="ንብረት ዝርከበሉ ቦታ የእትዉ"
                         }
                         else if($scope.telephone==undefined){
                             $scope.alertUploadImage="ቁጽሪ ተለፎን ናይ ዋና ንብረት የእትዉ"
                         }
                         else if($scope.description==undefined){
                                $scope.alertUploadImage="መግለጺ ንብረት ጸሓፉ"
                         }else if($scope.imageUploaded=='no'){
                            $scope.alertUploadImage="ስእሊ ናይ ንብረት ጸዓኑ"
                         }else{
                          $scope.alertUploadImage=""
                         }
                   }else if ($scope.languageKey=='NL'){
                       if($scope.itemName==undefined){
                         $scope.alertUploadImage="Artikelnaam is leeg, vul deze in"
                         }
                        else if($scope.categoryId==undefined){
                           $scope.alertUploadImage="Artikelcategorie is leeg, selecteer een categorie"
                        }
                         else if($scope.price==undefined){
                             $scope.alertUploadImage="Artikelprijs is leeg, vul deze in"
                         }
                         else if($scope.unit==undefined){
                             $scope.alertUploadImage="Artikeleenheid is leeg, vul deze in"
                         }
                         else if($scope.place==undefined){
                             $scope.alertUploadImage="plaats waar de items gevonden zijn is leeg, vul de plaats in"
                         }
                         else if($scope.telephone==undefined){
                             $scope.alertUploadImage="contact telefoon is leeg plase vul hem"
                         }
                         else if($scope.description==undefined){
                                $scope.alertUploadImage="Objectbeschrijving is leeg, vul het met plasen"
                         }else if($scope.imageUploaded=='no'){
                            $scope.alertUploadImage="afbeelding uploaden"
                         }else{
                          $scope.alertUploadImage=""
                         }
                   }else{
                      if($scope.itemName==undefined){
                         $scope.alertUploadImage="Item name is empty,please fill it"
                     }
                    else if($scope.categoryId==undefined){
                       $scope.alertUploadImage="Item category is empty,please select category"
                    }
                     else if($scope.price==undefined){
                         $scope.alertUploadImage="Item price is empty,please fill it"
                     }
                     else if($scope.unit==undefined){
                         $scope.alertUploadImage="Item unit is empty,please fill it"
                     }
                     else if($scope.place==undefined){
                         $scope.alertUploadImage="place where the items is found is empty,please fill place"
                     }
                     else if($scope.telephone==undefined){
                         $scope.alertUploadImage="contact telephone is empty plase fill it"
                     }
                     else if($scope.description==undefined){
                            $scope.alertUploadImage="Item description is empty,plase fill it"
                     }else if($scope.imageUploaded=='no'){
                        $scope.alertUploadImage="upload image"
                     }else{
                      $scope.alertUploadImage=""
                     }
                   }
                     
             }
              $scope.imageUploaded="no"
             //upload the croped image profile
              $scope.uploadCropedImage=function(){
                    errorCheckupForSaleItemInputs()
                    var mimeString = $scope.myCroppedImage.split(',')[0].split(':')[1].split(';')[0];
                    // post the data part and decode it
                    var dataString = window.atob($scope.myCroppedImage.split(',')[1]);
                    var dataArray = [];
                    for(var i = 0; i < dataString.length; i++)
                    {
                      dataArray.push(dataString.charCodeAt(i));
                    }
                    var imageData = new Blob([new Uint8Array(dataArray)], {type: mimeString});
                    var fd = new FormData();
                    if($scope.alertUploadImage==''){
                       fd.append('file', imageData);
                       var info = {
                        };
                         info.userId=$scope.idUser
                         info.itemName=$scope.itemName
                         info.catagories=$scope.categoryId
                         info.price=$scope.price
                         info.unit=$scope.unit
                         info.place=$scope.place
                         info.telephone=$scope.telephone
                         info.description=$scope.description
                        fd.append('data', info.userId);
                        fd.append('data', info.itemName);
                        fd.append('data', info.catagories);
                        fd.append('data', info.price);
                        fd.append('data', info.unit);
                        fd.append('data', info.place);
                        fd.append('data', info.telephone);
                        fd.append('data', info.description);
                        $http({
                          url: '/jobFinder//thingsToSale',
                          method: 'POST',
                          data: fd,
                          transformRequest:angular.identity,
                          headers:{'Content-Type':undefined}
                        }).then(function(response){
                        $scope.itemId=response.data.insertId
                        $scope.itemQuantity=!$scope.itemQuantity
                        }, function(response) {
                            $scope.error = response.statusText;
                        });
                  }  
              }
              $scope.addItem=function(itemAmount,itemSize){
                if($scope.itemId==null){
                  $scope.addButton=true;
                }else{
                  $scope.addButton=false
                  var itemData={}
                  itemData.itemId=$scope.itemId
                  itemData.itemAmount=itemAmount;
                  itemData.itemSize=itemSize
                  if(itemSize==undefined){
                   alert("Enter size of item:መዐቀኒ ንብረት የእቱ። ንኣብነት ክንደይ ኪሎ፣ወይ ቁመቱ ብ ሜትሮ፣ወይ ብጽምዲ ከነእቱ ኣለና።")

                  }else if(itemAmount==undefined){
                    alert("Enter number of items:ብዝሒ ናይዚ ዓይነት ንብረት እዚ የእቱ።")
                  }else{
                     $http.post('/addItemAmount',itemData).then(function(response){
                      $scope.addSuccess="add successfully";
                      $scope.itemAmount=undefined;
                      $scope.itemSize=undefined;
                  })
                  }
                 
                }
              }
               $scope.backToSaleItems=function(){
                  $window.location="/jobFinder/thingsToSale/"+$scope.userFullName
                }
              function getListOfSalethingsCategories(){
                     var salethingsCategories={}
                      salethingsCategories.webCollectionId='salethingsCategories'
                      alertService.getWebCollections(salethingsCategories).then(function(response){
                          $scope.salethingsCategoriesList=response.data
                      })
                }
               getListOfSalethingsCategories();
               $scope.getCategoryId=function(id){
                 $scope.categoryId=id;
               }
               $scope.selectCategoryById=function(id){
                 $scope.selectedCategoryId=id;
                 var selectedCategories={}
                 selectedCategories.selectedCategoryId=$scope.selectedCategoryId;
                 selectedCategories.languageKey=$scope.languageKey;
                 $http.post('/getSalethingsByItem',selectedCategories).then(function(response){
                   $scope.alldata=response.data;
                 })
               }
    })
//chatroom controller
    myApp.controller('chatRoomController',function($scope,$http,srvShareData,alertService,socket){
       //post public assets
            $scope.sharedData = srvShareData.getData();
            $scope.sharedDataUserName=$scope.sharedData[0];
            $scope.userFullName=$scope.sharedDataUserName[1];
            $scope.photo=$scope.sharedDataUserName[2]
            $scope.clientId=$scope.sharedDataUserName[3]
            $scope.professionalId=$scope.sharedDataUserName[4]
            $scope.Authenticate=$scope.sharedDataUserName[5]
            var data={}
             data.token=$scope.Authenticate
            function checkUserIdInRooms(){
              //
               $http.post('/jobFinder/postUserRoom',data).then(function(response){
                $scope.userIdRoom=response.data[0].userId;
                   if($scope.userIdRoom===undefined){
                   }else{
                      $scope.visible=true;
                   }
              })
            }
            checkUserIdInRooms();
            function rooms(){
              $http.post('/jobFinder/postRooms',data).then(function(response){
                $scope.rooms=response.data
              })
            }
          rooms();
            //socket io
                $scope.users = [];
                $scope.roomMember=[]
                socket.on('connect', function () { });
               function updateRoom(){
                 socket.on('infoToAuser', function (username, data) {
                    var user = {};
                    if($scope.languageKey=='TG'){
                      user.username = "ሓበሬታ ካብ ወሃቢ ሰርቪስ";
                      user.message = "ርክብ ጌርካ ኣለኻ መልእኽትኻ ክትሰድድ ትኽእል ኢካ";
                      user.date = new Date().getTime();
                      user.image = username.charAt(0).toUpperCase();
                      $scope.users.push(user);
                    }else if($scope.languageKey=='NL'){
                      user.username = username;
                      user.message = "Je bent verbonden. Begin met chatten";
                      user.date = new Date().getTime();
                      user.image = username.charAt(0).toUpperCase();
                      $scope.users.push(user);
                    }else{
                      user.username = username;
                      user.message = data;
                      user.date = new Date().getTime();
                      user.image = username.charAt(0).toUpperCase();
                      $scope.users.push(user);
                   }
                  });
                  //infoToAllUserInRoom
                  socket.on('infoToAllUserInRoom', function (username, data) {
                     var user = {};
                     if($scope.languageKey=='TG'){
                       user.username = "ሓበሬታ ካብ ወሃቢ ሰርቪስ";
                       user.message = data+" ኣትዩ ኣሎ።";
                       user.date = new Date().getTime();
                       user.image = username.charAt(0).toUpperCase();
                       $scope.users.push(user);
                     }else if($scope.languageKey=='NL'){
                       user.username = username;
                       user.message = data+" heeft verbinding gemaakt met deze kamer";
                       user.date = new Date().getTime();
                       user.image = username.charAt(0).toUpperCase();
                       $scope.users.push(user);
                     }else{
                       user.username = username;
                       user.message = data+" has connected to this room";
                       user.date = new Date().getTime();
                       user.image = username.charAt(0).toUpperCase();
                       $scope.users.push(user);
                     }
                   });

                   socket.on('updatechat', function (username, data) {
                      var user = {};
                      user.username = username;
                      user.message = data;
                      user.date = new Date().getTime();
                      user.image = username.charAt(0).toUpperCase();
                      $scope.users.push(user);
                    });
                    socket.on('userDisconnected', function (username, data) {
                       var user = {};
                       if($scope.languageKey=='TG'){
                         user.username = "ሓበሬታ ካብ ወሃቢ ሰርቪስ";
                         user.message = data+"ወጺኡ ኣሎ።";
                         user.date = new Date().getTime();
                         user.image = username.charAt(0).toUpperCase();
                         $scope.users.push(user);
                       }else if($scope.languageKey=='NL'){
                         user.username = username;
                         user.message = data+" heeft de verbinding verbroken";
                         user.date = new Date().getTime();
                         user.image = username.charAt(0).toUpperCase();
                         $scope.users.push(user);
                       }else{
                         user.username = username;
                         user.message = data+" has disconnected";
                         user.date = new Date().getTime();
                         user.image = username.charAt(0).toUpperCase();
                         $scope.users.push(user);
                       }
                     });
               }
              $scope.roomMember=[];
              function addMembers(){
                 socket.on('addRoomMember',function(data){
                   $scope.roomMember.length=0;
                  data.forEach(function(element){
                    $scope.roomMember.push(element)
                  })
               })
             }
              addMembers()
               function checkUserRoomIfAvailable(){
                 $scope.ShowHide = function () {
                   $scope.IsVisible = $scope.IsVisible ? false : true;
                    if($scope.IsVisible===true){
                    }else{
                      var data={}
                      data.userId=$scope.idUser;
                      data.username=$scope.userFullName;
                      data.room=$scope.roomNumber;
                      data.languageKey=$scope.languageKey;
                      socket.emit('disconnectuser', data);
                    }
                }
               }
               checkUserRoomIfAvailable();
               $scope.getRoomNumber=function(id,roomName){
                $scope.roomNumber=id
                $scope.roomName=roomName
               }
                $scope.createRoom = function () {
                  var data={}
                  data.username=$scope.userFullName
                  $scope.curtrentUser = data.username;
                  data.userId=$scope.idUser;
                  data.roomName=$scope.roomName;
                  data.roomDescription=$scope.roomDescription;
                  socket.emit('createroom', data);
                  updateRoom();
                  alertService.handelSaved()
                 $scope.visible=true
                  rooms();
                }
                $scope.joinRoom = function () {
                  var data={}
                  data.room=$scope.roomNumber;
                  data.username=$scope.userFullName;
                  data.userId=$scope.idUser;
                  data.roomName=$scope.roomName
                  $scope.curtrentUser = data.username;
                  data.languageKey=$scope.languageKey;
                  socket.emit('adduser', data);
                   updateRoom();
                }
                $scope.doPost = function (message) {
                  if(message==''){

                  }else{
                     socket.emit('sendchat', message);
                     $scope.message='';
                  }

                }
                 $scope.onEnter=function(message){
                     if(message==''){

                     }else{
                        socket.emit('sendchat', message);
                        $scope.message='';
                     }

            }
    })
//issues
    myApp.controller('issueController',function($scope,$http,srvShareData,alertService,professionRetriever){
        //post public assets
            $scope.sharedData = srvShareData.getData();
            $scope.sharedDataUserName=$scope.sharedData[0];
            $scope.userFullName=$scope.sharedDataUserName[1];
            $scope.photo=$scope.sharedDataUserName[2]
            $scope.clientId=$scope.sharedDataUserName[3]
            $scope.professionalId=$scope.sharedDataUserName[4]
             $scope.Authenticate=$scope.sharedDataUserName[5]
             $scope.country=$scope.sharedDataUserName[8];
             $scope.livesIn=$scope.sharedDataUserName[9]
              var data={}
              data.token=$scope.Authenticate;
            function checkIfUserIsClientOrProfessional(){
              alertService.checkIfUserIsClientOrProfessional(data).then(function(response){
                $scope.userIdentity=response.data;
              })
           }
           function getIssues(){

            $http.post('/jobFinder/getIssues',data).then(function(response){
              $scope.computerProblem=response.data
            })
           }
           getIssues();
           alertService.getCurrentUserId(data).then(function(response){
               $scope.idUser=response.data
            });
            function getListOfIssues(){
                   var genderInfo={}
                    genderInfo.webCollectionId='issues'
                    alertService.getWebCollections(genderInfo).then(function(response){
                        $scope.problemsCriteria=response.data
                    })
              }
             getListOfIssues();
         // $scope.problemsCriteria=["Mobile Problems","Computer Problems","Health Problems","Legal Issues","Others"]
           $scope.getProblemId=function(id){
            $scope.id=id;
           }
           $scope.givesug=function(){
              data.problemId=$scope.id;
              data.suggestion=$scope.suggestionBox
              if(data.suggestion==undefined){
                  if($scope.languageKey=='TG'){
                      alert("መጀመርያ ርኢተኹም ጸሓፉ ብድሕሪኡ ኣብዚ ክሊዝ ገበርኩሞ ክሊግ ግበሩ ብድሕሪኡ መልእክትኹም ክስደድ እዩ።")
                  }else{
                    alert("fill your suggestion first.")
                  }
              }else{
                 $http.post('/generalProblemSuggestion',data).then(function(response){
                    alertService.handelSaved();
                  })
              }

           }
            $scope.lookSuggestions=function(id){
            suggestions(id)
           }
           $scope.suggestionsReply=function(problemId,suggestionId,message){
            data.suggestionId=suggestionId;
            data.message=message;
            $http.post('/jobFinder/replySuggestion',data).then(function(response){
            })
           }
           $scope.replies=function(id){
              data.suggestionId=id
             $http.post('/jobFinder/getReplies',data).then(function(response){
                  $scope.replyData=response.data
             })
           }

          // replies();
           function suggestions(id){
            data.problemId=id;
            $http.post('/jobFinder/lookSuggestions',data).then(function(response){
              $scope.problemSuggestions=response.data
            })
           }
           checkIfUserIsClientOrProfessional();
           $scope.fillProfession = function(){
               var data=null
               var dataPromise = professionRetriever.getProfession($scope.profession,$scope.languageKey);
                 $scope.datas=null;
                 dataPromise.then(function(data){
                 $scope.professionDatas = data;
                });
            }
            $scope.professionSelection = function(suggestion){
              $scope.selectedProfession=suggestion
            }
        $scope.issue=function(){
               data.name=$scope.userFullName
              data.problemType=$scope.problemType.Id
              data.livesIn=$scope.livesIn
              data.problem=$scope.problem
             if($scope.iDontKnow==true){
                data.problemCouldBeSolvedBy="I dont know"
              }else{
                data.problemCouldBeSolvedBy=$scope.profession
             }
             if(data.problemType==undefined || data.problem==undefined){
                  if($scope.languageKey=='TG'){
                     alert("ዘይመልእ ባዶ ቦታ ኣለካ ንሱ መጀመርያ ምልእዎ ብድሕሪኡ ኣብዚ ክሊዝ ዝገበርኩሞ ክሊግ ትገብሩ።")
                  }else{
                    alert("fill all fields please")
                  }

             }else{
                 $http.post('/jobFinder/issues',data).then(function(response){
                    postData();
                     getIssues();
                  })

                 if($scope.languageKey=='TG'){
                      alert("መልእኽቲ ብትኽክል ተሰዲዱ ኣሎ።")
                       $scope.disableIssueButton=true
                        getIssues();
                 }else{
                   alert("Sent successfully")
                    $scope.disableIssueButton=true
                     getIssues();
                 }
             }
        }
        $scope.filterByProblemChanged=function(id){
            $scope.problemSuggestions=''
            data.problemType=id
            $http.post('/jobFinder/postProblemsIssues',data).then(function(response){
              $scope.computerProblem=response.data
            })
        }
        $scope.delete=function(id){
          data.id=id
          $http.post('/jobFinder/deleteProblem',data).then(function(response){
             getIssues();
            alertService.handelDelete();
          })
        }
    })
//daily life happenings controller
    myApp.controller('newscontroller',function($scope,$http,$window,$location,srvShareData,alertService,$translate,loginDirectoryLeader){

            $scope.onClickLoginFromNewsHomePage=function(){
              var directory="/jobFinder/dailyLifeHappenings/"
              loginDirectoryLeader.addData(directory)
            }
            //post public assets
            $scope.sharedData = srvShareData.getData();
            if($scope.sharedData.length==0){

            }else {
              $scope.sharedDataUserName=$scope.sharedData[0];
              $scope.userFullName=$scope.sharedDataUserName[1];
              $scope.photo=$scope.sharedDataUserName[2]
              $scope.Authenticate=$scope.sharedDataUserName[5]
              $scope.permission=$scope.sharedDataUserName[6]
              $scope.languageKey=$scope.sharedDataUserName[7]
              $scope.country=$scope.sharedDataUserName[8];
              $scope.livesIn=$scope.sharedDataUserName[9];
            }

            $scope.newsprovidername=$scope.userFullName;
             $scope.getListOfDailyLife=function(){
                   var genderInfo={}
                    genderInfo.webCollectionId='news'
                    alertService.getWebCollections(genderInfo).then(function(response){
                        $scope.issueItems=response.data
                    })
              }
              $scope.changeLanguage = function (langKey) {
                 $scope.languageKey=langKey;
                 $translate.use(langKey);
               };
               if($scope.sharedData.length==0){

               }else{
                 var data={}
                data.token=$scope.Authenticate;
                 function checkIfUserIsClientOrProfessional(){
                    alertService.checkIfUserIsClientOrProfessional(data).then(function(response){
                      $scope.userIdentity=response.data;
                    })
                   }
                    alertService.getCurrentUserId(data).then(function(response){
                       $scope.idUser=response.data
                     })
               checkIfUserIsClientOrProfessional();
               }

           function getAllWritings(writting){
             var data1={}
            data1.historyType=writting
            $http.post('/jobFinder/allNews',data1).then(function(response){
              $scope.allNewsInfo=response.data
            })
           }
           function getAllNewsRandomly(){
             $http.post('/jobFinder/allNewsRandombly').then(function(response){
              $scope.allNewsInfo=response.data
            })
           }
           getAllNewsRandomly();
           $scope.newsbtn=function(){
            var writting="3"
              getAllWritings(writting);
              getAllTitles(writting)
           }
            $scope.dictationbtn=function(){
            var writting="5"
              getAllWritings(writting);
              getAllTitles(writting)
           }
            $scope.fictionsbtn=function(){
            var writting="4"
               getAllWritings(writting);
               getAllTitles(writting)
           }
           $scope.transport=function(){
            $window.location.href = "/jobFinder/findTransport/"+$scope.userFullName;
           }
            function getAllTitles(writting){
              var data1={}
            data1.historyType=writting
            $http.post('/jobFinder/allNewsTitles',data1).then(function(response){
              $scope.allTitles=response.data
            })
           }
           getAllTitles();
           function getSubTitle(mainTitleId){
               data.titleId=mainTitleId
               $http.post('/jobFinder/getSubTitles',data).then(function(response){
                  $scope.subTitle=response.data;
               })
           }
           $scope.getNewsById=function(id){
             var title={}
             title.title=id;
             $http.post('/getNewsByTitle',title).then(function(response){
               $scope.allNewsInfo=response.data;
             })
           }
           $scope.newStart=function(){
             $scope.newsProviderId=""
             $scope.newsTextId=""
             $scope.newsMainTitleId=""
             $scope.newsSubTitleId="";
             $scope.newsMainTitle="";
             $scope.newsSubTitle="";
             $scope.newsText="";
             $scope.telephone="";
             $scope.newsButtonDisabled=false;
           }
           $scope.newSubTitle=function(){
             $scope.newsSubTitle="";
             $scope.newsText="";
             $scope.newsButtonDisabled=false;
           }
        $scope.submitNews=function(){
          if($scope.newsprovidertele==undefined || $scope.historyType.Id==undefined || $scope.newsMainTitle==undefined || $scope.newsSubTitle==undefined || $scope.newsText==undefined){
              if($scope.languageKey=='TG'){
                     alert("ኩሎም ክምልኡ ዘለዎም ቦታታት ኣይመላእኩሞምን። ስለዚ መጀመርያ ኩሉ ዘድሊ ዘሎ ቦታ ምልእዎ።")
              }else{
                alert("fields are incomplete")
              }
            }else{
               newsUploader();
               if($scope.languageKey=='TG'){
                  alert("መልእክትኹም ብትኽክል ተመስርሑ ኣሎ ዝኣቱ ስእሊ ወይ ቪድዮ ተልዩኩም ከተእትዉ ትኽእሉ ኢኩም።")
                  $scope.newsButtonDisabled=true;
               }else{
                 alert("sent successfully, if you need to upload image or vidio you can upload now ")
                  $scope.newsButtonDisabled=true;
               }
            }

        }
        $scope.getSelectedHistoryType=function(){
           getAllNews();
           getAllTitles();

        }
       $scope.disabledfileUpload=true;
        $scope.checkUploadedFile=function(){
          $http.post('/jobFinder/newsFileUploader').then(function(response){
            $scope.fileIsUploaded=response.data
          })
        }
        function newsUploader(){
          data.newsprovidername=$scope.newsprovidername;
          data.newsprovidertele=$scope.newsprovidertele;
          data.historyType=$scope.historyType.Id;

          $http.post('/jobFinder/newsUploaderInfo',data).then(function(response){
            $scope.newsProviderId=response.data.insertId;
            mainNewsText();
          })
        }
         function mainNewsText(){
             var mainNewsData={}
             mainNewsData.token=$scope.Authenticate;
             mainNewsData.newsProviderId=$scope.newsProviderId;
             mainNewsData.newsText=$scope.newsText;
             $http.post('/jobFinder/mainNews',mainNewsData).then(function(response){
                $scope.newsTextId=response.data.insertId;
                 mainTitle();
             })
        }
         function mainTitle(){
            data.newsTextId=$scope.newsTextId
            data.newsMainTitle=$scope.newsMainTitle
            $http.post('/jobFinder/newsMainTitle',data).then(function(response){
              $scope.newsMainTitleId=response.data.insertId;
              subTitle()
            });
        }
       function subTitle(){
           var newsSubTitleData={}
             newsSubTitleData.token=$scope.Authenticate;
             newsSubTitleData.newsSubTitle=$scope.newsSubTitle;
             newsSubTitleData.newsMainTitleId=$scope.newsMainTitleId
             $http.post('/jobFinder/newsSubTitles',newsSubTitleData).then(function(response){
              $scope.newsSubTitleId=response.data.insertId
              $scope.disabledfileUpload=false;
            });
        }
        $scope.deleteNews=function(id,fileName){
          data.id=id
          data.fileName=fileName;
          $http.post('/jobFinder/deleteNews',data).then(function(response){
            alertService.handelDelete()
            getAllNews();
            getAllTitles();
          })

        }
    })
//notification
    myApp.controller('notificationcontroller',function($scope,$http,srvShareData,socket,alertService){
        //post public assets
            $scope.sharedData = srvShareData.getData();
            $scope.sharedDataUserName=$scope.sharedData[0];
            $scope.userFullName=$scope.sharedDataUserName[1];
            $scope.photo=$scope.sharedDataUserName[2]
            $scope.Authenticate=$scope.sharedDataUserName[5]
              var data={}
              data.token=$scope.Authenticate
             //open chat box
                 $scope.letsChat=function(toUserId,toName){
                    $scope.toUserId=toUserId;
                     data.toUserId=toUserId
                    //get a user room number
                        $http.post('/jobFinder/postRoom',data).then(function(response){
                          $scope.roomNumber=response.data[0].userroom
                        })
                        $http.post('/jobFinder/getMessagesThatHadWithMe',data).then(function(response){
                          var messageData=response.data
                          $scope.postUserMessagesAtNotification=messageData.reverse();
                        })
                       $scope.chatbox=true;
                       $scope.toName=toName
                  }
                  $scope.closeChat=function(name){
                       $scope.chatbox=false;
                  }
           //post the messages
        function postMessages(){
           alertService.getMessagesNotification(data).then(function(response){
                       $scope.postUserMessages=response.data
                      if(response.data.length>4){
                       $scope.lastMessageId=response.data[4].Id
                      }
            })
        }
        postMessages();
         $scope.postUserMessagesAtNotification = [];
          socket.on('connect', function () { });
            socket.on('updateprivatechat', function (fromUserFullName, data,userId,photo,toUserId) {
              var user = {};
              user.photo=photo
              user.username = fromUserFullName;
              user.toUserId=toUserId
              user.message = data;
              user.date = new Date();
              $scope.postUserMessagesAtNotification.push(user);
          });
      //send message to user
          $scope.doPost = function (message) {
              if(message==''){

              }else{
                    var data={}
                    data.message=message
                    data.photo=$scope.photo
                    data.toUserId=$scope.toUserId;
                    data.fromUserFullName=$scope.userFullName;
                    data.fromUserId=$scope.idUser;
                    data.room=$scope.roomNumber
                    data.userIs=$scope.userIs;
                    socket.emit('sendprivatechat', data);
                    $scope.message='';
              }

          }
           $scope.onEnter=function(message){
                     if(message==''){
                     }else{
                          var data={}
                          data.message=message
                          data.photo=$scope.photo
                          data.toUserId=$scope.toUserId;
                          data.fromUserFullName=$scope.userFullName;
                          data.fromUserId=$scope.idUser;
                          data.room=$scope.roomNumber
                          data.userIs=$scope.userIs;
                          socket.emit('sendprivatechat', data);
                          $scope.message='';
                     }
            }
            function clearPropertyData(){
                      $scope.name=undefined
                      $scope.gender=undefined
                      $scope.profession=undefined
                      $scope.livesInNotification=undefined
                      $scope.email=undefined
                      $scope.workSession=undefined
                      $scope.remarks=undefined
                       $scope.name=undefined
                      $scope.gender=undefined
                      $scope.lookingFor=undefined
                      $scope.timeTaken=undefined
                      $scope.workDetails=undefined
                        $scope.telephone=undefined
                      $scope.date=undefined
                      $scope.fromPlace=undefined
                      $scope.toPlace=undefined
                      $scope.transportChoosed=undefined
            }
        $scope.details=function(id,location){
            data.userId=id
            data.location=location;
            data.languageKey=$scope.languageKey;
              if(location=="professional"){
                clearPropertyData();
                 alertService.getUserInfo(data).then(function(response){
                    $scope.name=response.data[0].name;
                    $scope.gender=response.data[0].gender;
                    $scope.profession=response.data[0].profession;
                    $scope.livesInNotification=response.data[0].livesIn;
                    $scope.country=response.data[0].country;
                    $scope.email=response.data[0].email;
                    $scope.workSession=response.data[0].workSession
                    $scope.remarks=response.data[0].remarks;
                    $scope.countryNotification=response.data[0].country;
                  })
               }else if(location=="client"){
                clearPropertyData();
                 alertService.getUserInfo(data).then(function(response){
                    $scope.name=response.data[0].name;
                    $scope.gender=response.data[0].gender;
                    $scope.lookingFor=response.data[0].lookingFor;
                    $scope.livesInNotification=response.data[0].livesIn
                     $scope.country=response.data[0].country;
                     $scope.email=response.data[0].email;
                    $scope.timeTaken=response.data[0].timeTaken;
                    $scope.workDetails=response.data[0].workDetails
                     $scope.remarks=response.data[0].remarks;
                     $scope.countryNotification=response.data[0].country;
                  })
               }else if(location=="passenger"){
                clearPropertyData();
                alertService.getUserInfo(data).then(function(response){
                  $scope.telephone=response.data[0].telephone;
                  $scope.date=response.data[0].date;
                  $scope.fromPlace=response.data[0].fromPlace;
                  $scope.toPlace=response.data[0].toPlace;
                  $scope.transportChoosed=response.data[0].transportChoosed;
                  $scope.countryNotification=response.data[0].country;
                  $scope.livesInNotification=response.data[0].livesIn;
                });
              }else if(location=="normalUser"){
                clearPropertyData();
                alertService.getUserInfo(data).then(function(response){
                  $scope.name=response.data[0].name;
                  $scope.email=response.data[0].email;
                  $scope.country=response.data[0].country;
                  $scope.livesInNotification=response.data[0].livesIn;
                });
              }
        }
    })
//professional
   myApp.controller('professionalCtrl',function($scope,$http,$filter,srvShareData,alertService,socket,professionRetriever){
            $scope.sharedData = srvShareData.getData();
            $scope.sharedDataUserName=$scope.sharedData[0];
            $scope.userFullName=$scope.sharedDataUserName[1];
            $scope.photo=$scope.sharedDataUserName[2]
            $scope.Authenticate=$scope.sharedDataUserName[5]
            $scope.languageKey=$scope.sharedDataUserName[7]
           // $scope.country=$scope.sharedDataUserName[8]
                var data={}
                data.token=$scope.Authenticate;
           function getListOfProfessionStatus(){
                   var profeStatusInfo={}
                    profeStatusInfo.webCollectionId='profeStatus'
                    alertService.getWebCollections(profeStatusInfo).then(function(response){
                        $scope.statuses=response.data
                    })
              }
              getListOfProfessionStatus();
            $scope.fillProfession = function(){
                var data=null
                var dataPromise = professionRetriever.getProfession($scope.profession,$scope.languageKey);
                  $scope.datas=null;
                  dataPromise.then(function(data){
                  $scope.professionDatas = data;
                 });
             }
             $scope.professionSelection = function(suggestion){
               $scope.selectedProfession=suggestion
             }
            $scope.workProfession=function(id){
                  $scope.professionalsProfessionId=id
            }
            $scope.workTimechanged=function(id){
                  $scope.workingPeriodId=id
            }
            $scope.pworksituation=function(id){
             $scope.pWorkSituationId=id
            }
           // $scope.getListOfProfessionalAvailablity=function(){
                    var profAvailabltyInfo={}
                    profAvailabltyInfo.webCollectionId='profeAvailability'
                    alertService.getWebCollections(profAvailabltyInfo).then(function(response){
                        $scope.workTimeDatas=response.data
                    })
           // }
           function loadProfessionalInfo(){
                      data.languageKey=$scope.languageKey
                     $http.post('/jobFinder/professionalMainTable',data).then(function(response){
                         if(response.data.length==0){
                         }else{
                          $scope.professionalMainTableId=response.data[0].Id
                          $scope.pTele=response.data[0].telephone
                          $scope.pRemark=response.data[0].remarks
                          $scope.profession=response.data[0].profession
                          $scope.workingPeriod=response.data[0].workSession;
                          $scope.pWorkSituation=response.data[0].lookingForJobThisTime;
                           $scope.professionalsProfessionId=response.data[0].professionId
                          $scope.workingPeriodId=response.data[0].workSessionId;
                          $scope.pWorkSituationId=response.data[0].lookingForJobThisTimeId;
                         }
                     })
            }
           loadProfessionalInfo();
        // save professional information like professional name,tele,email
          $scope.saveInfo=function(){
                      data.professionalId=$scope.professionalMainTableId
                      data.tele=$scope.pTele
                      data.remark=$scope.pRemark
                      data.profession=$scope.profession
                      data.professionalWorkSession=$scope.workingPeriodId
                      data.pWorkSituation=$scope.pWorkSituationId;
                      data.languageKey=$scope.languageKey;
                  if(data.professionalId==undefined){
                    $http.post('/jobFinder/registerProfessional',data).then(function(response){
                      $scope.professionalId=response.data;
                     alertService.handelSaved();
                    });
                  }else{
                    $http.post('/jobFinder/updateprofessionalInfoData',data).then(function(response){
                       alertService.handleUpdated();
                    });
                  }
            }

  })
//client
      myApp.controller('clientCtrl',function($scope,$http,$filter,srvShareData,alertService,socket,countryRetriever,cityRetriever,professionRetriever){
            $scope.sharedData = srvShareData.getData();
            $scope.sharedDataUserName=$scope.sharedData[0];
            $scope.idUser=$scope.sharedDataUserName[0]
            $scope.userFullName=$scope.sharedDataUserName[1];
            $scope.photo=$scope.sharedDataUserName[2]
            $scope.clientId=$scope.sharedDataUserName[3]
            $scope.professionalId=$scope.sharedDataUserName[4]
             $scope.Authenticate=$scope.sharedDataUserName[5];
             $scope.languageKey=$scope.sharedDataUserName[7]
              var data={}
                 data.token=$scope.Authenticate;
                 $scope.fillCountry = function(){
                   var data=null
                     var dataPromise = countryRetriever.getCountry($scope.country);
                       $scope.datas=null;
                       dataPromise.then(function(data){
                       $scope.countryDatas = data;
                      });
                  }
                  $scope.fillCity = function(){
                      var data=null
                      if($scope.country==null){
                        alert("enter country first")
                      }else if($scope.selectedCountry==undefined){

                      }else{
                        var dataPromise = cityRetriever.getCity($scope.city,$scope.selectedCountry);
                          $scope.datas=null;
                          dataPromise.then(function(data){
                          $scope.cityDatas = data;
                         });
                      }
                   }
                   $scope.fillProfession = function(){
                       var data=null
                       var dataPromise = professionRetriever.getProfession($scope.profession,$scope.languageKey);
                         $scope.datas=null;
                         dataPromise.then(function(data){
                         $scope.professionDatas = data;
                        });
                    }
                  $scope.countrySelection = function(suggestion){
                    $scope.selectedCountry=suggestion
                  }
                  $scope.citySelection = function(suggestion){
                    $scope.selectedCity=suggestion

                  }
                  $scope.professionSelection = function(suggestion){
                    $scope.selectedProfession=suggestion
                  }
            function getListOfClientStatus(){
                   var genderInfo={}
                    genderInfo.webCollectionId='clientStatus'
                    alertService.getWebCollections(genderInfo).then(function(response){
                        $scope.statuses=response.data
                    })
              }
              getListOfClientStatus();

            $scope.getAllProfessions=function(){
                  alertService.allProfessions().then(function(response){
                      $scope.workProfessionDatas=response.data
                 })
            }
            $scope.getCountries=function(){
                 alertService.handelAllCountries().then(function(response){
                    $scope.countries=response.data
                  });
            }
            $scope.workProfession=function(id){
                  $scope.myProfessionDropDownId=id;
            }
            $scope.cworksituation=function(id){
                  $scope.cWorkSituationId=id
            }
             function loadClientInfo(){
                  data.languageKey=$scope.languageKey
              $http.post('/jobFinder/postClientMainTableData',data).then(function(response){
                if(response.data.length==0){
                }else{
                      $scope.clientMainTableId=response.data[0].Id;
                      $scope.cTele=response.data[0].telephone;
                      $scope.profession=response.data[0].lookingFor
                      $scope.myProfessionDropDownId=response.data[0].lookingForIdInClient
                      $scope.timeTaken=response.data[0].timeTaken
                      $scope.workSummary=response.data[0].workSummary
                      $scope.workDetails=response.data[0].workDetails
                       $scope.cWorkSituation=response.data[0].situationOfWorkAtThisTime
                      $scope.cWorkSituationId=response.data[0].situationOfWorkAtThisTimeIdInClients
                      $scope.country=response.data[0].workCountry;
                      $scope.city=response.data[0].workCity
                      $scope.name=response.data[0].name;
                      $scope.url=response.data[0].url;
                }
              })
          }
          loadClientInfo();
              //post work time
              function getworksession(){
                 $http.post('/jobFinder/postWorkTime',data).then(function(response){
                   $scope.workTime=response.data
                   var workTime=JSON.stringify((response.data).map(function(obj){ return obj.english }))
                   $scope.workTimeDatas=JSON.parse(workTime);
                  })
              }
          $scope.saveClientInfo=function(){
                  data.clientId=$scope.clientMainTableId
                    data.tele=$scope.cTele
                    data.lookingFor=$scope.profession
                    data.timeTaken=$scope.timeTaken
                    data.workSummary=$scope.workSummary
                    data.workDetails=$scope.workDetails
                    data.cWorkSituation=$scope.cWorkSituationId
                    data.country=$scope.country;
                    data.livesIn=$scope.city;
                    data.name=$scope.name;
                    data.url=$scope.url;
                    data.languageKey=$scope.languageKey
                  if(data.clientId==undefined){
                     $http.post('/jobFinder/clientMainInfo',data).then(function(response){
                       $scope.newContactId=response.data
                       $scope.clientId=response.data
                       alertService.handelSaved();
                       loadClientInfo();
                     });
                  }else{
                       $http.post('/jobFinder/updateclientMainInfo',data).then(function(response){
                         alertService.handleUpdated();
                       });
                    }
           }
      })
//transport
     myApp.controller('transportCtrl',function($scope,$http,$filter,$window,$location,srvShareData,alertService,socket,cityNetherlandRetriever,$translate,loginDirectoryLeader){
        //post public assets
                  $scope.sharedData = srvShareData.getData();
                //  $scope.dataToShare=results

                  if($scope.sharedData.length==0){
                  }else {
                    $scope.sharedDataUserName=$scope.sharedData[0];
                    $scope.userFullName=$scope.sharedDataUserName[1];
                    $scope.photo=$scope.sharedDataUserName[2]
                    $scope.clientId=$scope.sharedDataUserName[3]
                    $scope.professionalId=$scope.sharedDataUserName[4]
                    $scope.Authenticate=$scope.sharedDataUserName[5]
                    $scope.languageKey=$scope.sharedDataUserName[7];
                    $scope.country=$scope.sharedDataUserName[8];
                   $scope.livesIn=$scope.sharedDataUserName[9];
                  }
                  $scope.onClickLogin=function(){
                    var loginClickedFrom="/jobFinder/findTransport/"
                    loginDirectoryLeader.addData(loginClickedFrom)
                    console.log($window.sessionStorage['App.loginDirectoryLeader'])

                  }
                 var data={}
                 data.token=$scope.Authenticate;
         //populating transport type to dropbox and cities  to city dropdown
            var transportationArray=["Train(ባቡር)","Bus(ኣውቶቡስ)","Tax(ታክሲ)","Subway(ሜትሮ)","moped(ሞተረ ብሽግለታ)","Plane(ነፋሪት)","Ship(መርከብ)","Boat(ጃልባ)","Truck(ናይ ጽዕነት ኤነትረ)","Bicycle(ብሽግለታ)"]
            $scope.transports=transportationArray;
                 alertService.getCurrentUserId(data).then(function(response){
                   $scope.idUser=response.data
                 });
              //  getCities();
                function codeEmpty(){
                  if($scope.code==undefined){
                    if($scope.languageKey=='TG'){
                      alert("ሓበሬታ፥ሓበሬታኹም ስለዘመሓየሽኩሞ ፣መጓዓዝያ መሪጽኩም ነርኩም ተኾይንኩም፣ ከምባሓዲሽ ክትመርጹ ኣለኩም።")
                    }else{
                      alert("Take care! your previous transport selection is not  working now anymore, unless you select it again at your next step if necessary for you.")
                    }
                  }
                }
                 $scope.showMeansOfTransport=function(){
                  $scope.airPlaneJourney=!$scope.airPlaneJourney
                  $scope.travelInfo=!$scope.travelInfo
                }
                $scope.travelByAirPlane=function(){
                  $scope.airPlaneJourney=!$scope.airPlaneJourney
                  $scope.travelInfo=!$scope.travelInfo
                }
          //save information of travelers like traveller name,email,from city ,to city
           $scope.contactTransportSubmition=function(){
                  data.id=$scope.id
                  data.transportChoosed=$scope.transportChoosed
                  data.fromPlace=$scope.fromCity
                  data.toPlace=$scope.toCity
                  data.date=$scope.date
                  data.telephone=$scope.telephone
                  data.code="noCode"
                  data.fromTime=$scope.fromTime;
                  if($scope.code==undefined){
                    codeEmpty();
                  }
                  if($scope.languageKey=='TG'){
                     if(data.id===undefined){
                     $http.post('/jobFinder/contactinfo',data).then(function(response){
                      $scope.result="succesfully registerd."
                      $scope.inseteddataId=response.data
                    })
                  }else{
                    $http.post('/jobFinder/updatePassenger',data).then(function(response){
                      $scope.result="succesfully updated"
                    })
                  }
                }else{
                   if(data.id===undefined){
                     $http.post('/jobFinder/contactinfo',data).then(function(response){
                    $scope.result="succesfully registerd."
                      $scope.inseteddataId=response.data
                    })
                  }else{
                    $http.post('/jobFinder/updatePassenger',data).then(function(response){
                      $scope.result="succesfully updated."
                    })
                  }
                }
            }
            $scope.regiterToTravelByTrain=function(){
                  data.id=$scope.id;
                  data.transportChoosed="Train";
                  data.fromPlace=$scope.fromCity;
                  data.toPlace=$scope.toCity;
                  data.date=$scope.date;
                  data.telephone=$scope.telephone;
                  data.code="travelByTrain";
                  data.passengerRemarks=$scope.passengerRemarks;
                  data.fromTime=$scope.fromTime;
                  if($scope.languageKey=='TG'){
                     if(data.id===undefined){
                     $http.post('/jobFinder/contactinfo',data).then(function(response){
                      $scope.inseteddataId=response.data
                      $scope.result="succesfully registerd"
                      })
                     var data2={}
                      data2.fromUserId=$scope.idUser;
                      data2.message="toAdmin"
                      data2.userIs="passenger";
                      data2.isChanging="adding"
                      data2.userFullName=$scope.userFullName;
                      socket.emit('sendprivatechat', data2);
                    }else{
                      $http.post('/jobFinder/updatePassenger',data).then(function(response){
                       $scope.result="Successfully updated.Thank you!"
                      })
                      var data2={}
                      data2.fromUserId=$scope.idUser;
                      data2.message="toAdmin"
                      data2.userIs="passenger";
                      data2.isChanging="updating"
                      data2.userFullName=$scope.userFullName;
                      socket.emit('sendprivatechat', data2);
                    }
                  }else{
                     if(data.id===undefined){
                     $http.post('/jobFinder/contactinfo',data).then(function(response){
                      $scope.inseteddataId=response.data
                      $scope.result="succesfully registered.Thank you!"
                    })
                      var data2={}
                      data2.fromUserId=$scope.idUser;
                      data2.message="toAdmin"
                      data2.userIs="passenger";
                      data2.isChanging="adding"
                      data2.userFullName=$scope.userFullName;
                      socket.emit('sendprivatechat', data2);
                  }else{
                      $http.post('/jobFinder/updatePassenger',data).then(function(response){
                        $scope.result="Successfully updated.Thank you!"
                      })
                      var data2={}
                        data2.fromUserId=$scope.idUser;
                        data2.message="toAdmin"
                        data2.userIs="passenger";
                        data2.isChanging="updating"
                        data2.userFullName=$scope.userFullName;
                        socket.emit('sendprivatechat', data2);
                   }
                  }
                data.toUserId=1
                data.message=""
                data.userIs="passenger"
            }
            function transportFieldController(fromPlace,toPlace){
              if(fromPlace==undefined){
                $scope.transportFieldControllerInfo="select from city"
              }else if(toPlace==undefined){
                 $scope.transportFieldControllerInfo="select to city"
              }else{
                  $scope.transportFieldControllerInfo=""
              }
            }
           $scope.getTransportOwnerInfo=function(){
             if($scope.id===undefined){
              $scope.transportImage=false;
             }else{
               $scope.transportImage=true;
             }
              getTransportId();
           }
           function getTransportId(){
             $http.post('/jobFinder/getOwnTransportInfo',data).then(function(response){
                   $scope.myTransportData=response.data;
                   $scope.transportId=response.data[0].id;
                   $scope.id=response.data[0].id;
                   $scope.transportChoosed=response.data[0].type
                   $scope.fromCity=response.data[0].fromPlace;
                   $scope.toCity=response.data[0].toPlace;
                   $scope.date=new Date(response.data[0].date);
                   $scope.fromTime=new Date(response.data[0].fromTime);
                   $scope.toTime=new Date(response.data[0].toTime);
                   $scope.numberOfSeats=response.data[0].numberOfSeats;
                   $scope.additionalInfo=response.data[0].additionalInfo;
                   $scope.telephone=response.data[0].telephone;
                   $scope.transportPhto=response.data[0].photo;
             })
           }
           getTransportId();
     //save information of transport owner like owner name,active time, from place ,to place
            $scope.ownerSubmit=function(){
                  var toPlace=$scope.selectedToCity;
                  var fromPlace=$scope.selectedFromCity;
                  var ownerDate=$scope.ownerDate;
                  data.id=$scope.id;
                  data.transportChoosed=$scope.transportChoosed;
                  data.fromPlace=$scope.fromCity;
                  data.toPlace=$scope.toCity;
                  data.date=$scope.date;
                  data.fromTime=$scope.fromTime;
                  data.toTime=$scope.toTime;
                  data.numberOfSeats=$scope.numberOfSeats;
                  data.additionalInfo=$scope.additionalInfo;
                  data.telephone=$scope.telephone;
                  console.log(data.fromTime,data.toTime,data.numberOfSeats,data.additionalInfo)
                  transportFieldController(fromPlace,toPlace);
                    if($scope.transportFieldControllerInfo===""){
                      if($scope.id===undefined){
                        $http.post('/jobFinder/transOwnerInfo',data).then(function(response){
                          $scope.result="Successfully registered.Thank you!";
                          $scope.transportOwnerId=response.id
                           $scope.transportImage=true;
                        });
                     }else{
                      $http.post('/jobFinder/updateTransportOwner',data).then(function(response){
                        $scope.result="Successfully updated.Thank you!"
                      })
                     }
                    }else{

                    }

              }
            $scope.fillFromCity = function(){
                var data=null
                  var dataPromise = cityNetherlandRetriever.getCity($scope.fromCity);
                    $scope.datas=null;
                    dataPromise.then(function(data){
                    $scope.cityDatas = data;
                   });
             }
             $scope.fillToCity = function(){
                 var data=null
                   var dataPromise = cityNetherlandRetriever.getCity($scope.toCity);
                     $scope.datas=null;
                     dataPromise.then(function(data){
                     $scope.cityDatas = data;
                    });
              }
             $scope.cityFromSelection = function(suggestion){
               $scope.selectedFromCity=suggestion
             }
             $scope.cityToSelection = function(suggestion){
               $scope.selectedToCity=suggestion
             }
            $scope.request=function(transportId,transportChoosed,fromPlace,toPlace,date,toUserId){
                    data.transportChoosed=transportChoosed;
                    data.fromPlace=fromPlace;
                    data.toPlace=toPlace;
                    data.date=date;
                    data.telephone=$scope.telephone
                    data.code=transportId;
                    data.toUserId=toUserId;
                    data.id=$scope.id;
                    data.fromTime=$scope.fromTime;
                   function checkIfTheTransportOwnerIsOnline(){
                      $http.post('/checkOnline',data).then(function(response){
                        $scope.room=response.data;
                      })
                    }
                    checkIfTheTransportOwnerIsOnline();
                 if($scope.languageKey=='TG'){
                     if($scope.id===undefined){
                         if($scope.telephone==undefined){
                           alert("ቁጽሪ ተሌፎን ብትኽክል ኣእቱ።")
                          }else{
                           $http.post('/jobFinder/contactinfo',data).then(function(response){
                               $scope.result="Request has been send succesfully.Thank you!"
                           })
                          }
                     }else{
                        $http.post('/jobFinder/updateCodeOfPassengerWithTransportId',data).then(function(response){
                            $scope.result="you have been transfered to the transport you have chosen.Thank you!"
                        })
                     }
                 }else{
                     if($scope.id===undefined){
                         if($scope.telephone==undefined){
                           alert("Fill telephon number correctly")
                          }else{
                           $http.post('/jobFinder/contactinfo',data).then(function(response){
                               $scope.result="Request has been send succesfully.Thank you!"
                           })
                          }
                     }else{
                        $http.post('/jobFinder/updateCodeOfPassengerWithTransportId',data).then(function(response){
                          $scope.result="you have been transfered to the transport you have chosen.Thank you!"
                        })
                     }
                 }
                var data2={}
                data2.fromUserId=$scope.idUser;
                data2.toUserId=toUserId;
                data2.message="would like to join your journey";
                data2.userIs="passenger";
                data2.room=$scope.room;
                socket.emit('sendprivatechat', data2);
            }
            $scope.changeLanguage = function (langKey) {
               $scope.languageKey=langKey;
               $translate.use(langKey);
             };
             $scope.moneyTransferRequest=function(){
               var data={}
               data.message=$scope.moneyTransferRequestMessage
               if(data.message!==undefined){
                 // $http.post('/moneyTransfer',data).then(function(response){
                 //   confirmitionMessage()
                 // })
                 socket.emit('moneyTransfer',data.message)
                 socket.on('moneyTransfer',function(data){
                    confirmitionMessage();
                  })
               }else{
                 fillTelephone();
               }

             }
             function confirmitionMessage(){
               if($scope.languageKey=='TG'){
                 $scope.requestReply="ርክብ ብምግባርኩም ኣዚና ነመስግን።መልአኽትኹም ብግቡእ ተሰዲዱ ኣሎ ድሕሪ ቅሩብ ግዜ ክንረኽበኩም ኢና።"
               }else if($scope.languageKey=='NL'){
                 $scope.requestReply="Veel dank! Uw bericht is succesvol verzonden, wij nemen spoedig contact met u op."
               }else{
                 $scope.requestReply="Thank you verymuch! Your message has been sent succefully,we will contact you very soon.";
               }
             }
             function fillTelephone(){
               if($scope.languageKey=='TG'){
                 $scope.requestReply="መጀመርያ መልአኽትኹም ጸሓፉ እቲ መልእኽቲ ተለፎንኩም ዝሓዘ ክኸውን ኣለዎ መታን ብ ተለፎንኩም ክንረኽበኩም።መልእክቲ ምጽሓፍ ምስ ወዳእኩም ኣብዚ ዝጠወቅኩሞ(ስደድ ዝብል ዘሎ መልጎም) ጠውቑ።"
               }else if($scope.languageKey=='NL'){
                 $scope.requestReply="schrijf een bericht inclusief uw telefoon alstublieft."
               }else{
                 $scope.requestReply="write message including your telephone please.";
               }
             }
             $scope.closeChat=function(){
               $scope.chatbox=false;
             }
             $scope.airTravel=function(){
               var data={}
               data.message=$scope.airTravelMessage;
               if(data.message!==undefined){
                 socket.emit('airTravel',data.message)
                 socket.on('airTravel',function(data){
                   // alert(data)
                   //  if(data=='no'){
                      confirmitionMessage();
                    // }else{
                    //   $scope.chatbox=true;
                    // }
                  })
               }else{
                fillTelephone();
               }

             }
              //a detail lookup if someone is going to travel to the same place you go
    $scope.detailTravelInfo=function(){
          var selectedDate = new Date($scope.date)
          var selectedDay = selectedDate.getDate();
          var selectedMonth = selectedDate.getMonth()+1; //January is 0!
          var selectedYear = selectedDate.getFullYear();
          var userSelectedDate=selectedDay+","+selectedMonth+","+selectedYear
          todayDate=new Date(Date.now())
          todayDay=todayDate.getDate();
          todayMonth=todayDate.getMonth()+1;
          todayYear=todayDate.getFullYear();
         var today=todayDay+","+todayMonth+","+todayYear
            if(todayYear==selectedYear){
                if(todayMonth>selectedMonth){
                  if($scope.languageKey=='TG'){
                    $scope.requestReply="ኣብ ምምራጽ ወርሒ ተጋጊኹም ኣለኹም።እዚ ዘለናዮ ወርሒ ወይ ካብዚ ወርሒ ዚ ንንየው ዘለዉ ኣዋርሕ ክንመርጽ ኣለና."
                  }else if($scope.languageKey=='NL'){
                   $scope.requestReply="maand moet deze maand of volgende maand zijn vanaf deze maand."
                  }else{
                    $scope.requestReply="month has to be this month or next months from this month."
                  }

                }else{
                  if(todayDay>selectedDay){
                     if($scope.languageKey=='TG'){
                        $scope.requestReply="ኣብ ምምራጽ መዓልቲ ተጋጊኹም ኣለኹም።እዚ ዘለናዮ መዓልቲ ወይ ካብ ሎምዓልቲ ንንየው ዘለዉ መዓልታት ክንመርጽ ኣለና."
                      }else if($scope.languageKey=='NL'){
                       $scope.requestReply="Dag moet deze dag of volgende dagen zijn vanaf deze dag."
                      }else{
                        $scope.requestReply="month has to be this month or next months from this month."
                      }
                  }else{
                    getTravelInfo();
                  }
                }
            }else{
               if($scope.languageKey=='TG'){
                    $scope.requestReply="ዝምረጽ ዓመት እዚ ዘለናዮ ዓመት ክኸውን ኣለዎ።"
                  }else if($scope.languageKey=='NL'){
                   $scope.requestReply="Een geselecteerd jaar moet dit jaar zijn."
                  }else{
                    $scope.requestReply="A selected year has to be this year"
                  }
            }

    }
        function getTravelInfo(){
           if($scope.passengerId==undefined){

              }else {
                  requestAcceptance();
              }
                var data={};
                var convertedDate=$filter('date')($scope.date, "yyyy-MM-dd")
                data.toConvert=$scope.date;
                data.date=$scope.date
                data.fromPlace=$scope.fromCity
                data.toPlace=$scope.toCity
                data.transportChoosed=$scope.transportChoosed
                if(data.date==undefined || data.fromPlace==undefined || data.toPlace==undefined || data.transportChoosed==undefined){
                  if($scope.languageKey=='TG'){
                    $scope.requestReply="ኩሎም ዝምልኡ ቦታታት ምልእዎም። ዕለት፣ካብ፣ናብ፣ብ   ዝብሉ ዘለዉ ቦታታት ብግቡእ ምልእዎም ብድሕሪኡ ኣብ ጉዕዞ ተዓዘብ ዝብል ጠውቕ።"
                  }else if($scope.languageKey=='NL'){
                    $scope.requestReply="Vul alle velden in alstublieft."
                  }else{
                    $scope.requestReply="Fill all fields please.";
                  }
                }else{
                  $http.post('/jobFinder/transportLookUp',data).then(function(response){
                    $scope.numberOfTravellersToThisPlace=response.data
                    if($scope.numberOfTravellersToThisPlace.length==0){
                      if($scope.languageKey=='TG'){
                        $scope.requestReply="ኣብዚ ዝመረጽኩሞ ቦታን ዕለትን ዝተመዝገበ ተጓዓዛይ የለን።ስለዚ ቀዳሞት ተጎዓዝቲ ንኽትኾኑ ተመዝገቡ።ዝኾነ ዘይተረዳኣኹም ነገር እንተሃልዩ ኣብ ልዕሊ መልእኽቲ ብምስዳድ ክትረኽቡናን ዝያዳ ሓበሬታ ክትረኽቡን ትኽእሉ።"
                        $scope.passengersList=false;
                      }else if($scope.languageKey=='NL'){
                        $scope.requestReply="Geen passagiers in dit gebied nog, wees de eerste om te registreren als passagier van de datum in dit gebied."
                        $scope.passengersList=false;
                      }else{
                        $scope.requestReply="No passengers in this area yet, be the first  to register as passenger of the date at this area."
                        $scope.passengersList=false;
                      }

                    }else{
                      $scope.requestReply=""
                      $scope.passengersList=true;

                    }
                  })
                  getTransport();
                }
        }
                function getTransport(){
                  var data={}
                   var convertedDate=$filter('date')($scope.date, "yyyy-MM-dd")
                        data.toConvert=$scope.date;
                        data.date=$scope.date
                        data.fromPlace=$scope.fromCity
                        data.toPlace=$scope.toCity
                        data.transportChoosed=$scope.transportChoosed
                     $http.post('/jobFinder/getTransport',data).then(function(response){
                        $scope.readyTransports=response.data;
                        if($scope.readyTransports.length==0){
                          if($scope.languageKey=='TG'){
                            $scope.requestReply="ኣብዚ ዝመረጽኩሞ ቦታን ዕለትን ዝተመዝገባ መጓዓዝያ የለዋን።መጓዓዝያ ተልያትኩም ከተመዝግብዋ ትኽእሉ ኢኹም።"
                            $scope.readyTransportsList=false;
                          }else if($scope.languageKey=='NL'){
                            $scope.requestReply="Geen transport geregistreerd in dit gebied, als eerste om een voertuig te registreren"
                            $scope.readyTransportsList=false;
                          }else{
                            $scope.requestReply="No transport registered at this area yet,be the first to register a vehicle."
                            $scope.readyTransportsList=false;
                          }
                        }else{
                          $scope.requestReply=""
                          $scope.readyTransportsList=true;
                        }
                    })
                }
             //get all requests if they selected my vehicle
                $scope.getAllRequests=function(){
                  var transportInfo={}
                  transportInfo.transportId=$scope.transportId;
                  $http.post('/getPassengerRequests',transportInfo).then(function(response){
                    $scope.allRequests=response.data
                  })
                }
                $scope.acceptRequest=function(passengerId,passengerUserId){
                  data.passengerId=passengerId;
                  data.transportId=$scope.transportId;
                  data.token=$scope.Authenticate;
                  data.passengerUserId=passengerUserId;
                  $http.post('/acceptRequest',data).then(function(response){
                    $scope.acceptance=response.data;
                    $scope.result="your acceptace has been sent to passenger"
                  })
                }
                $scope.getAllAcceptedRequests=function(){
                  var acceptedRequests={}
                  acceptedRequests.transportId=$scope.transportId;
                  $http.post('/getAcceptedRequestsData',acceptedRequests).then(function(response){
                    $scope.acceptedRequestsData=response.data
                  })
                }
                $scope.whoAcceptMyRequest=function(){
                  requestAcceptance();
                }
                function requestAcceptance(){
                  var myInfo={}
                  myInfo.passengerId=$scope.passengerId;
                  myInfo.approved=$scope.approved;
                  myInfo.code=$scope.code;
                  $http.post('/getWhoAcceptedMe',myInfo).then(function(response){
                    $scope.whoAcceptedMe=response.data
                    if($scope.whoAcceptedMe.length==0){
                      requestButtonDisabled=true;
                    }else{
                      requestButtonDisabled=false;
                    }
                  })
                }
                 // function myage() {
                 //      var todayDate =$scope.userBirthDate;
                 //          var birthDateYear = todayDate.getFullYear();
                 //          var todayMonth = todayDate.getMonth();
                 //          var todayDay = todayDate.getDate();
                 //          var today=new Date()
                 //          // var todayYear=today.getFullYear();
                 //          // var myage = todayYear-birthDateYear;

                 //  };
                function getMyInfo(){
                  $http.post('/jobFinder/getMyInfo',data).then(function(response){
                    $scope.myinfodata=response.data;
                    $scope.passengerId=response.data[0].id
                    $scope.id=response.data[0].id;
                    $scope.telephone=response.data[0].telephone;
                    $scope.date=new Date(response.data[0].date);
                    $scope.fromTime=new Date(response.data[0].fromTime)
                    $scope.fromCity=response.data[0].fromPlace;
                    $scope.toCity=response.data[0].toPlace;
                    $scope.transportChoosed=response.data[0].transportChoosed;
                    $scope.code=response.data[0].code;
                    $scope.approved=response.data[0].approved;
                    $scope.passengerRemarks=response.data[0].remarks
                  })
                }
                getMyInfo();
                  $scope.myInfo=function(){
                    getMyInfo();
                  }

                  $scope.getTelephone=function(id){
                    $scope.telephone=id;
                  }
                  $scope.deleteMyInfo=function(id){
                    data.id=id
                    $http.post('/jobFinder/deletePassenger',data).then(function(response){
                      alert("deleted")
                    })
                  }
                  $scope.update=function(){
                     data.id=$scope.id
                      data.telephone=$scope.telephone
                      data.date=$scope.date
                      data.fromPlace=$scope.fromCity
                      data.toPlace=$scope.toCity
                      data.transportChoosed=$scope.transportChoosed
                      data.code=$scope.code;
                      data.fromTime=$scope.fromTime;
                      if($scope.languageKey=='TG'){
                         $http.post('/jobFinder/updatePassenger',data).then(function(response){
                           $scope.result="passenger has been updated successfully.Thank you!"
                        })
                       }else{
                         $http.post('/jobFinder/updatePassenger',data).then(function(response){
                            $scope.result="passenger has been updated successfully.Thank you!"
                        })
                       }
                  }
                $scope.backToDailyLifeHomePage=function(){
                  $window.location="/jobFinder/dailyLifeHappenings/"+$scope.userFullName
                }

      });
//work transactions
     myApp.controller('workTransactionCtrl',function($scope,$http,srvShareData,$window,$location,alertService,socket){
          //public declarations
            $scope.sharedData = srvShareData.getData();
            $scope.sharedDataUserName=$scope.sharedData[0];
            $scope.userFullName=$scope.sharedDataUserName[1];
            $scope.photo=$scope.sharedDataUserName[2]
            $scope.Authenticate=$scope.sharedDataUserName[5];
             $scope.languageKey=$scope.sharedDataUserName[7]
             $scope.saved="";
             var data={}
                       data.token=$scope.Authenticate;
             alertService.getCurrentUserId(data).then(function(response){
              $scope.idUser=response.data;
             })
           //list of all professionals
               $scope.professionalList=function(){
                       data.profession=$scope.showProfessionals,
                       data.livesIn=$scope.showProfessionalsLivesIn,
                       data.workingSession=$scope.showProfessionalsWorkPeriod
                       data.languageKey=$scope.languageKey;
                  alertService.loadAllProfessionals(data).then(function(response){
                    $scope.listOfTranslators=response.data
                  })
                }
                $scope.professionalMotivation=function(id){
                  //$scope.professionalList=!$scope.professionalList;
                  $scope.motivation=""
                  var professionalData={}
                  professionalData.id=id;
                  professionalData.languageKey=$scope.languageKey
                  $http.post('/getProfessionalMotivation',professionalData).then(function(response){
                    $scope.motivation=response.data[0].remarks
                  })
                }
                $scope.professionalRegistration=function(){
                    $window.location.href = '/jobFinder/professionalRegistrationForm/'+$scope.userFullName;
                }
                $scope.clientRegistration=function(){
                  $window.location.href = '/jobFinder/clientRegistrationForm/'+$scope.userFullName;
                }
         //sending request to professional
           $scope.sendRequestToProfessionalOrClient=function(toUserId,messageBox,room){
                   alert($scope.userIs)
                  var data={};
                 if($scope.userIs=="client"){
                  data.message="has a job for you";
                  }else{
                   data.message="has applied for your job";
                  }
                  data.photo=$scope.photo
                  data.fromUserFullName=$scope.userFullName;
                  data.toUserId=toUserId;
                  data.fromUserId=$scope.idUser;
                  data.room=room;
                  data.userIs=$scope.userIs
                  socket.emit('sendprivatechat', data);
                  socket.on('updateprivatechat', function (data) {
                    //$scope.saved="Work invitation has been sent";
                    if($scope.languageKey=='TG'){
                             alertService.handelWorkInvitatioTig();
                    }else{
                       alertService.handelWorkInvitation();
                    }
                  });
           }
           $scope.sendFriendRequestToProfessionalOrClient=function(toUserId,messageBox,room){
                      var data={}
                      data.message="Friend Request"
                      data.photo=$scope.photo
                      data.fromUserFullName=$scope.userFullName;
                      data.toUserId=toUserId;
                      data.room=room;
                      data.fromUserId=$scope.idUser;
                      data.userIs=$scope.userIs;
                      socket.emit('sendprivatechat', data);
                       socket.on('updateprivatechat', function (data) {
                          $scope.saved="friend request has been sent";
                           if($scope.languageKey=='TG'){
                                     alertService.handelFriendRequestTig();
                            }else{
                               alertService.handelFriendRequest();
                            }
                        });
           }
           //sending messsage to professional
            $scope.sendMessageToProfessionalOrClient=function(toUserId,messageBox,room){
                    var data={}
                    data.message=messageBox
                    data.photo=$scope.photo
                    data.fromUserFullName=$scope.userFullName;
                    data.toUserId=toUserId;
                    data.room=room;
                    data.fromUserId=$scope.idUser
                    data.userIs=$scope.userIs
                    socket.emit('sendprivatechat', data);
                     socket.on('updateprivatechat', function (data) {
                          $scope.saved="message has been sent";
                           if($scope.languageKey=='TG'){
                                     alertService.handelMessageSentTig()
                            }else{
                               alertService.handelMessageSent()
                            }
                     });

              }
              function checkIfUserIsClientOrProfessional(){
                alertService.checkIfUserIsClientOrProfessional(data).then(function(response){
                 $scope.userIdentity=response.data;
                 $scope.userIs=$scope.userIdentity.userIs
                 if($scope.userIdentity.userIs==='client'){
                       $scope.disabledClient=true;
                       $scope.disabledProfessional=false;
                       $scope.disablingProfessionalRegistration=true;
                        $scope.disablingClientRegistration=false;
                   }else if($scope.userIdentity.userIs==='professional'){
                          $scope.disabledProfessional=true;
                           $scope.disabledClient=false;
                           $scope.disablingClientRegistration=true;
                            $scope.disablingProfessionalRegistration=false;
                   }else{
                     $scope.disabledProfessional=true;
                     $scope.disabledClient=true;
                      $scope.disablingProfessionalRegistration=false;
                       $scope.disablingClientRegistration=false;
                   }
                  })
             }
             checkIfUserIsClientOrProfessional()
            //post all clients
           $scope.loadAllClients=function(){
               data.languageKey=$scope.languageKey
                alertService.loadAllClients(data).then(function(response){
                  $scope.allClientsDetails=response.data
                })
           }
           $scope.getWorkDetails=function(id){
             $scope.showWorkDetails=!$scope.showWorkDetails
             var clientInfo={}
             clientInfo.id=id;
             clientInfo.languageKey=$scope.languageKey;
             $http.post('/getClientWorkDetails',clientInfo).then(function(response){
               $scope.workDetails=response.data[0].workDetails;
             })
           }
           $scope.backToClientsList=function(){
              $scope.showWorkDetails=!$scope.showWorkDetails
           }
           $scope.backToProfessionalsList=function(){
             $scope.professionalList=!$scope.professionalList
           }
  });
//service...............................................................
      myApp.service('srvShareData', function($window) {
        var KEY = 'App.SelectedValue';
        //adding name and id of the user to the sessionStorage
        var addData = function(newObj) {
            var mydata = $window.sessionStorage.getItem(KEY);
            if (mydata) {
                mydata = JSON.parse(mydata);
            } else {
                mydata = [];
            }
            mydata=[]//clearing the array at every page load, other wise commet this to add things to the array at every page load
            mydata.push(newObj);
            $window.sessionStorage.setItem(KEY, JSON.stringify(mydata));
        };


        var getData = function(){
            var mydata = $window.sessionStorage.getItem(KEY);
            if (mydata) {
                mydata = JSON.parse(mydata);
            }
            return mydata || [];
        };


        return {
            addData: addData,
            getData: getData

        };
    });
    myApp.service('candidateUser', function($window) {
      var KEY = 'App.candidateUser';
      //adding name and id of the user to the sessionStorage
      var addData = function(newObj) {
          var mydata = $window.sessionStorage.getItem(KEY);
          if (mydata) {
              mydata = JSON.parse(mydata);
          } else {
              mydata = [];
          }
          mydata=[]//clearing the array at every page load, other wise commet this to add things to the array at every page load
          mydata.push(newObj);
          $window.sessionStorage.setItem(KEY, JSON.stringify(mydata));
      };
      var getData = function(){
          var mydata = $window.sessionStorage.getItem(KEY);
          if (mydata) {
              mydata = JSON.parse(mydata);
          }
          return mydata || [];
      };
      return {
          addData: addData,
          getData: getData

      };
    });
  myApp.service('loginDirectoryLeader', function($window) {
    var KEY = 'App.loginDirectoryLeader';
    //adding name and id of the user to the sessionStorage
    var addData = function(newObj) {
        var mydata = $window.sessionStorage.getItem(KEY);
        if (mydata) {
            mydata = JSON.parse(mydata);
        } else {
            mydata = [];
        }
        mydata=[]//clearing the array at every page load, other wise commet this to add things to the array at every page load
        mydata.push(newObj);
        $window.sessionStorage.setItem(KEY, JSON.stringify(mydata));
    };
    var getData = function(){
        var mydata = $window.sessionStorage.getItem(KEY);
        if (mydata) {
            mydata = JSON.parse(mydata);
        }
        return mydata || [];
    };
    return {
        addData: addData,
        getData: getData

    };
   });
//adimn works
  myApp.controller('adminController',function($scope,$http,srvShareData,alertService){
            $scope.sharedData = srvShareData.getData();
            $scope.sharedDataUserName=$scope.sharedData[0];
            $scope.userFullName=$scope.sharedDataUserName[1];
            $scope.photo=$scope.sharedDataUserName[2]
            $scope.Authenticate=$scope.sharedDataUserName[5]
            $scope.languageKey=$scope.sharedDataUserName[7]
             var data={}
              data.token=$scope.Authenticate;
            $scope.loadPassengers=function(){
              data.passengers=$scope.passengers;
              $http.post('/jobFinder/allPassengers',data).then(function(response){
                $scope.allPassengers=response.data
              })
            }
            $scope.getWebCollections=function(){
              $http.get('/webcollections').then(function(response){
                $scope.allWebCollections=response.data
              })
            }
            $scope.addWebCollection=function(){
              console.log($scope.webCollectionId)
              data.webCollectionId=$scope.webCollectionId
              data.english=$scope.english
              data.tigrina=$scope.tigrina
              data.dutch=$scope.dutch
              data.Authenticate=$scope.Authenticate
              $http.post('/addWebCollection',data).then(function(response){
                $scope.doneSuccefully=response.id+ "  has been succefully added"
              })
            }
            $scope.updateWebCollection=function(){
              data.webCollectionAutoId=$scope.webCollectionAutoId;
              data.webCollectionId=$scope.webCollectionId
              data.english=$scope.english
              data.tigrina=$scope.tigrina
              data.dutch=$scope.dutch
              data.Authenticate=$scope.Authenticate
              $http.post('/updateWebCollection',data).then(function(response){
                $scope.doneSuccefully="updated succefully"
              })
            }
            $scope.editWebCollection=function(id,webCollectionId,english,tigrina,dutch){
              $scope.webCollectionAutoId=id
              $scope.webCollectionId=webCollectionId
              $scope.english=english
              $scope.tigrina=tigrina
              $scope.dutch=dutch
            }
            $scope.deleteWebCollection=function(){
              data.webCollectionAutoId=$scope.webCollectionAutoId
              $http.post('/deletWebCollectionId',data).then(function(response){
                $scope.doneSuccefully="deleted succefully"
              })
            }
            $scope.deleteExternalInfo=function(){
              $http.post('/deleteExternalDataInfo').then(function(response){
                alert("deleted successfully")
              })
            }
             $scope.loadTrainPassengers=function(){
              $http.post('/jobFinder/allTrainPassengers',data).then(function(response){
                $scope.allTrainPassengers=response.data
              })
            }
            $scope.loadTransportOwners=function(){
                data.transportOwner=$scope.transportOwner;
              $http.post('/jobFinder/allTransportOwners',data).then(function(response){
                $scope.allTransportOwners=response.data
              })
            }

    //post users
       function postusers(){
           data.users=$scope.users;
           $http.post('/jobFinder/getAllusersToAdminPage',data).then(function(response){
              $scope.adminpostUsers=response.data
          })
       }
       $scope.loadUsers=function(){
         postusers();
       }
      $scope.deleteUser=function(id){
        data.userIdToBeDeleted=id
        $http.post('/jobFinder/adminDeleteUser',data).then(function(response){
            postusers();
            alert('deleted successfully')
        })
      }
    //delete
       $scope.deleteRoom=function(){
           postRooms()
       }

  //post clients
         function postAllClients(){
           data.client=$scope.client;
            $http.post('/jobFinder/adminpostClients',data).then(function(response){
              $scope.clients=response.data
            })
         }
         $scope.postClients=function(){
            postAllClients();
         }
  //delete clienty
        $scope.deleteClients=function(id){
            data.clientId=id
            alert(id)
            $http.post('/jobFinder/adminDeleteClient',data).then(function(response){
                   $scope.success=response.data;
                   alert($scope.success)
            })
         }
         $scope.deleteTransportOwner=function(id){
            data.transportOwnerId=id;
          $http.post('/deleteTransportOwners',data).then(function(response){
              $scope.success=response.data
          })
         }
         $scope.deletePassenger=function(id){
          data.passengerId=id;
          $http.post('/jobFinder/deletePassengers',data).then(function(response){
              $scope.success=response.data
          })
         }
         $scope.postProfessionals=function(){
           data.professinal=$scope.professinal;
          $http.post('/adminProfessionals',data).then(function(response){
            $scope.professionals=response.data
          })
         }
         $scope.deleteProfessional=function(id){
          data.professionalId=id;
          $http.post('/adminDeleteProfessional',data).then(function(response){
            $scope.success=response.data;
          })
         }
         $scope.permissionCriterias=["admin","chatbox","clientRegistration","news","travel","professionalRegistration","thingsToSale","moneyTransfer"]
         $scope.loadUser=function(){
           data.user=$scope.user;
            $http.post('/admin/getPermissions',data).then(function(response){
              $scope.permissions=response.data;
           })
         }
         $scope.updatePermission=function(userId,permission,permissionId){
            data.userId=userId;
            data.permission=permission;
            data.permissionId=permissionId
           if(permissionId==undefined){
              $http.post("/addPermission",data).then(function(response){
                $scope.sucess=response.data
                alert("permission added")
               })
           }else{
             $http.post("/updatePermission",data).then(function(response){
                $scope.sucess=response.data
                alert("updated")
               })
           }
         }
         $scope.addPermission=function(userId,permission,permissionId){
            data.userId=userId;
            data.permission=permission;
            data.permissionId=permissionId
              $http.post("/addPermission",data).then(function(response){
                $scope.sucess=response.data
                alert("permission added")
               })
         }
          $scope.uploadWorkLists=function(){
            $http.get('/getAllWorkList').then(function(response){
              $scope.workListProfessions=response.data;
            })
          }

        $scope.updateWorkList=function(id,translatedTigrignaProfession){
          var workInfo={}
          workInfo.Id=id
          workInfo.translatedTigrignaProfession=translatedTigrignaProfession;
          $http.post('/updateWorkProfessionList',workInfo).then(function(response){
            alert("updated successfully");
          })
        }
        $scope.contacts=function(){
          $http.post('/getContacts').then(function(response){
            $scope.contactsInof=response.data
          })
        }
        $scope.airTravel=function(){
          $http.post('/getAirTravel').then(function(response){
            $scope.airTravelInfo=response.data
          })
        }
        $scope.moneyTransfer=function(){
          $http.post('/getMoneyTransfer').then(function(response){
            $scope.moneyTransferInfo=response.data
          })
        }
        $scope.deleteContact=function(id){
          var data={}
          data.id=id
          $http.post('/deleteContactInfo',data).then(function(response){
            alert("deleted")
          })
        }
        $scope.deleteAirTravel=function(id){
          var data={}
          data.id=id
          $http.post('/deleteAirTravel',data).then(function(response){
            alert("deleted")
          })
        }
        $scope.deleteMoneyTransfer=function(id){
          var data={}
          data.id=id
          $http.post('/deleteMoneyTransfer',data).then(function(response){
            alert("deleted")
          })
        }

  })
